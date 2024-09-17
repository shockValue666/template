"use server"

import { client } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server"

export const onGetCurrentUser = async () => {
    const {userId, redirectToSignIn} = auth();

    if(!userId) redirectToSignIn();
    if(userId){
        try {
            const profile = await client.profile.findUnique({
                where:{
                    clerkId:userId
                },
                select:{
                    id:true,
                    email:true,
                }
            })
            if(profile){
                return {user:profile}
            }
        } catch (error) {
            console.log("error : ",error)
            return {user:null}
        }
    }

}   