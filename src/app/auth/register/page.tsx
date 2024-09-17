"use client";
import React from 'react'
import AuthProvider from './providers/auth-provider';
import { useRegisterForm } from './hooks/use-register';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import New from './components/new';
import { StepContextProvider } from './providers/step-provider';

const Page = () => {
  
  return (
    <AuthProvider>
      <StepContextProvider>
          <New/>
      </StepContextProvider>
    </AuthProvider>
  )
}

export default Page