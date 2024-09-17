"use client";
import React, { useEffect, useState } from 'react'
import AuthProvider from '../providers/auth-provider';
import { useRegisterForm } from '../hooks/use-register';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { useStepContext } from '../providers/step-provider';
import PasswordConfirmPassword from './password-confirm-password';
import OTP from './otp';


const New = () => {

  const {step, setStep} = useStepContext()
  const [otp, setOtp] = useState<string>("")
  const {register,setValue, formState:{errors}} = useFormContext();
  setValue("otp",otp)
  useEffect(()=>{
    console.log("errors: ",errors)
  },[errors])


  return (
    <div className='flex justify-center items-center my-28'>
      {
        step === 1 ? <PasswordConfirmPassword errors={errors} register={register}/> : <OTP otp={otp} setOtp={setOtp}/>
      }
    </div>
  )
}

export default New