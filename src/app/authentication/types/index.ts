import {z, ZodType} from 'zod'

type UserProps = {
    name: string
    email: string
    password: string
}

export const UserSchema:ZodType<UserProps> =  z.object({
    name: z
        .string()
        .min(2,{message:"username must be at least 2 characters long"}),
    email: z.string().email({message:"invalid email"}).trim(),
    password: z
        .string()
        .min(2,{message:"password must be at least 2 characters long"})
        .trim(),
})

export type FormState = 
    | {
        errors?:{
            name?:string[]
            email?:string[]
            password?:string[]
        },
        message?:string
    }
    | undefined
    | null


export type SessionPayload = {
    id:string,
    expiresAt:Date
}