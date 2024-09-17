"use client"
import { Button } from '@/components/ui/button'
import React from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'

const Page = () => {
    const methods = useForm()
    const onHandleSubmit = async () => {
        console.log("handling submit")
    }

    // const {register} = useFormContext();
  return (
    <FormProvider {...methods}>
        <form action="" onSubmit={onHandleSubmit}>
            <NestedInput/>
            <Button>
                
            </Button>
        </form>
    </FormProvider>
  )
}

const NestedInput = () => {
    const {register} = useFormContext()
    return (
        <>
            <input type="text" {...register("email")}/>
        </>
    )
}

export default Page