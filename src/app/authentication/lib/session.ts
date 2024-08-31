import "server-only"
import {SignJWT, jwtVerify} from 'jose'
import { SessionPayload } from "../types"
import {cookies} from 'next/headers'
import { client } from "@/lib/prisma"

const sessionSecretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(sessionSecretKey)


export const encrypt = async (payload:SessionPayload) => {
    return new SignJWT(payload) 
        .setProtectedHeader({alg:"HS256"})
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
}

export const decrypt = async (session: string | undefined="") => {
    try {
        const {payload} = await jwtVerify(session, encodedKey,{
            algorithms:["HS256"]
        })
        return payload;
    } catch (error) {
        console.log("Failed to verify session")
    }
}

export const createSession = async (userId:string) => {
    const expiresAt = new Date(Date.now() * 7* 24* 60*60*1000)
    const session = await encrypt({id:userId,expiresAt})

    cookies().set("session", session, {
        httpOnly: true,
        path: "/",
        expires: expiresAt,
        sameSite:"lax",
        secure:true
    })
}

export const updateSession = async () => {
    const session = cookies().get("session")?.value
    const payload = await decrypt(session)

    if(!session || !payload){
        console.log("session doesn't exist or payload doesn't exist")
        return null
    }

    const expires = new Date(Date.now() * 7* 24* 60*60*1000)
    cookies().set('session',session,{
        httpOnly:true,
        path:"/",
        expires,
        sameSite:"lax",
        secure:true
    })
}

export const deleteSession = async () => {
    cookies().delete("session")
}

export const createSessionDb = async (id:string) => {
    const expiresAt = (new Date(Date.now() * 7* 24* 60*60*1000)).toISOString()
    const data = await client.sessionData.create({
        data:{
            userId:id,
            expiresAt
        },
        select:{
            id:true
        }
    })
    if(!data.id){
        console.log("error creating session data")
    }
    const sessionId = data.id
    const newExpiresAt = new Date(expiresAt)
    const session = await encrypt({id:sessionId,expiresAt:newExpiresAt})

    cookies().set("session",session,{
        httpOnly:true,
        path:"/",
        expires:newExpiresAt,
        sameSite:"lax",
        secure:true
    })
}