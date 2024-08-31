import "server-only"

import {cookies} from 'next/headers'
import {decrypt} from "../lib/session"
import { cache } from "react"
import { redirect } from "next/navigation"

export const verifySession = cache(async () => {
    const cookie = cookies().get("session")?.value
    const session = await decrypt(cookie)

    if(!session?.id){
        redirect("/login")
    }

    return {
        isAuth:true,
        userId:session?.id
    }
})