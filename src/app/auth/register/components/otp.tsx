"use client";
import React, { useState } from 'react'
import { OTPInput } from './otp-input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button';
import { useStepContext } from '../providers/step-provider';

interface Props {
    otp:string,
    setOtp:React.Dispatch<React.SetStateAction<string>>
}

const OTP:React.FC<Props> = ({otp,setOtp}) => {
    const {setStep} = useStepContext()
  return (
    <div>
        <Label className='text-3xl'>
            OTP
        </Label>
        <p className='text-gray-500'>Enter the otp sent to your email.</p>
        <OTPInput otp={otp} setOtp={setOtp}/>
        <div className='flex justify-center'>
            <Button className='mt-4' variant='outline' onClick={()=>setStep(step=>step-1)}>
                Back
            </Button>
            <Button className='mt-4'>
                Verify
            </Button>
        </div>
    </div>
  )
}

export default OTP