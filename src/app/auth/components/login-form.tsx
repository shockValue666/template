"use client";
import { USER_LOGIN_FORM } from '../constants/forms'
import React from 'react'
import FormGenerator from './form-generator'
import { useForm, useFormContext } from 'react-hook-form'

const LoginForm = () => {
    const {register, formState:{errors}} = useFormContext()
  return (
    <>
    <h2 className='text-text dark:text-text-dark md:text-4xl font-bold'>
        log in 
    </h2>
    <p className='text-text dark:text-text-dark md:text-sm'>
        Enter your email and password
    </p>
    here

    {
        USER_LOGIN_FORM.map((field) => {
            console.log("field: ", field)
            return (<FormGenerator
                key={field.id}
                {...field}
                register={register}
                errors={errors}
                name={field.name}
            />)
        })
    }
    </>
  )
}

export default LoginForm