"use server";

import { client } from "@/lib/prisma";
import { FormState, UserSchema } from "../types";
import bcrypt from 'bcrypt'
import { createSession, deleteSession } from "../lib/session";
import { verifySession } from "../lib/dal";
import { cache } from "react";

export const signUpAction = async (
    state:FormState,
    formData: FormData) => {
    console.log("state: ",state)
    console.log("formData: ",formData)
    const validatedFields = UserSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
    })

    if(!validatedFields.success){
        console.log("validation failed: ",validatedFields.error)
        return {
            errors:validatedFields.error.flatten().fieldErrors
        }
    }

    const userExists = await client.testUsers.findFirst({
        where:{
            OR: [
                {
                    email: validatedFields.data.email
                },
                {
                    name: validatedFields.data.name
                },
                
            ]
        },
        select:{
            id:true
        }
    })
    if(userExists?.id){
        console.log("user exists: ",userExists)
        return {
            errors:{
                email:["email or username already exists"]
            }
        }
    }

    const hashedPassword = await bcrypt.hash(validatedFields.data.password, 10)

    const user = await client.testUsers.create({
        data:{
            name: validatedFields.data.name,
            email: validatedFields.data.email,
            password: hashedPassword
        },
        select:{
            id:true
        }
    })
    if(!user?.id){
        return {
            errors:{
                email:["something went wrong"]
            }
        }
    }

    await createSession(user.id)

    return {
        message:"successfully signed up"
    }
}

export const logout = async () => {
    await deleteSession();
}

export const getUser = cache(async () => {
    const session = await verifySession();
    if(!session) return null

    try {
        const data = await client.testUsers.findMany({
            where: {
                id:session.userId
            },
            select:{
                id:true,
                name:true,
                email:true
            }
        })
        if(data[0]) return data[0]
    } catch (error) {
        console.log("error getting user: ",error)
    }
})