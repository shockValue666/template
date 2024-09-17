"use server";

import { client } from "@/lib/prisma";

export const onCompmleteUserRegistration = async (email:string,clerkId:string,type?:string) => {

    if(!clerkId) return null;
    try {
        const user = await client.profile.create({
            data:{
                clerkId,
                email:email
            }
        })
        return {status:200, user, error:null}
    } catch (error) {
        return {status:400, error, user:null}
    }

}