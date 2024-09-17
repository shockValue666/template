import { z } from "zod"

export type RegisterProps = {
    email: string
    password:string
    otp:string
}

export const RegisterSchema = z.object({
    email:z.string().email({message:"invalid email"}).trim(),
    password:z
        .string()
        .min(6,{message:"Password must be at least 6 characters"})
        .max(64,{message:"Password must be at most 64 characters"})
        .refine(
            (value) => /^[a-zA-Z0-9_.-]*$/.test(value ?? ''),
            'password should contain only alphabets and numbers'
        ),
    confirmPassword:z.string(),
    otp:z.string()
})
    .refine((schema)=>schema.confirmPassword === schema.password, {
        message:"Passwords don't match",
        path:["confirmPassword"]
    })

