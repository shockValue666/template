"use client";
import FormGenerator from '@/components/globals/form-generator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { FieldErrors, FieldValues, useFormContext, UseFormRegister } from 'react-hook-form'
import { useStepContext } from '../providers/step-provider';
import { useRegisterForm } from '../hooks/use-register';
import Link from 'next/link';


interface Props {
  register: UseFormRegister<FieldValues>,
  errors:FieldErrors<FieldValues>
}

const PasswordConfirmPassword:React.FC<Props> = ({register,errors}) => {
  const {getValues} = useFormContext()
  const {setStep} = useStepContext();
  const {onOTP} = useRegisterForm();
  return (
    <div className='flex flex-col gap-5 w-[250px] md:w-[400px]'>
            {/* <Label className='flex flex-col gap-2 text-xl' htmlFor="email">
                Email
            </Label>

              <Input
              type='text'
              placeholder="Email"
              {...register("email")}
              /> */}
              <FormGenerator
                type="email"
                inputType='input'
                register={register}
                name="email"
                label="Email"
                placeholder='Email'
                errors={errors}

              />

              <FormGenerator
                type="password"
                inputType='input'
                register={register}
                name="password"
                label="Password"
                placeholder='Password'
                errors={errors}
              />
              <FormGenerator
                type='password'
                inputType='input'
                register={register}
                name="confirmPassword"
                label='Confirm Password'
                placeholder='Confirm Password'
                errors={errors}
              />
              <Button type="submit" {...({onClick:async ()=>{
                await onOTP(getValues("email"),getValues("password"),setStep)
              }})}>
                Submit
              </Button>
              <p>
                Already have an account?{' '}
                <Link href="/auth/login" className='font-bold'>
                  Log in
                </Link> 
              </p>
      </div>
  )
}

export default PasswordConfirmPassword