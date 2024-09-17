"use client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react"
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod'
import { RegisterProps, RegisterSchema } from "../schemas/types";
import { ZodType } from "zod";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { onCompmleteUserRegistration } from "../actions";


export const useRegisterForm = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const {toast} = useToast();
    const {signUp,isLoaded,setActive} = useSignUp();
    const router = useRouter();

    const methods = useForm<RegisterProps>({
        resolver: zodResolver(RegisterSchema),
        mode:"onSubmit"
    })

    const onOTP = async (email:string, password:string, onNext:React.Dispatch<React.SetStateAction<number>>) => {
        console.log("generating one time password")
        setLoading(true)
        if(!isLoaded){
            console.log("not loaded yet")
            return null;
        }
        try {
            await signUp.create({
                emailAddress:email,
                password:password
            })
            await signUp.prepareEmailAddressVerification({strategy:"email_code"})
            onNext(prev=>prev+1)
            setLoading(false)
        } catch (error) {
            console.log("signup error : ",error)
            toast({
                title:"Error",
                description:"Something went wrong"
            })
        }

    }

    const onSubmit = methods.handleSubmit(async (data:RegisterProps)=>{
        if(!isLoaded) return null;

        try {
            setLoading(true)
            const completeSignup = await signUp.attemptEmailAddressVerification({
                code: data.otp
            })

            if(completeSignup.status !== "complete"){
                return {message:"Something went wrong!"}
            }


            if(completeSignup.status==="complete"){
                if(!signUp.createdUserId) return null;
                
                const registered = await onCompmleteUserRegistration(data.email,signUp.createdUserId)

                if(registered?.status === 200 && registered.user){
                    await setActive({
                        session: completeSignup.createdSessionId
                    })

                    setLoading(false)
                    toast({
                        title: "Account created.",
                        description: "We've created your account for you.",
                    })
                    router.push("/dashboard")
                }
                if(registered?.status === 400){
                    toast({
                        title:'Error',
                        description:"Something went wrong with your registration"
                    })
                } 
            }
        } catch (error:any) {
            toast({
                title:"Error",
                description:error.errors[0].longMessage
            })
        }
    })


    return {
        methods,
        loading,
        onSubmit,
        onOTP
    }
    
}