import LoginForm from '../components/login-form'
import SignInFormProvider from './providers/sign-in-form-provider'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <div className='flex justify-center items-center py-36  h-full'>
      <div className='flex flex-col  gap-3  '>
        <SignInFormProvider>
            <div className='flex flex-col gap-3 '>
              <LoginForm/>
              <div className='w-full flex flex-col gap-3 items-center'>
                <Button type="submit" className='w-full'>
                  Submit
                </Button>
                <p>
                  Don't have an account?{' '}
                  <Link href="/auth/register" className='font-bold'>
                    Create one
                  </Link> 
                </p>
              </div>
            </div>
        </SignInFormProvider>
      </div>
    </div>
  )
}

export default Page