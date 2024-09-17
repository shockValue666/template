"use client";
import Loader from '../../components/loader';
import { useToast } from '@/components/ui/use-toast';
import { AuthContextProvider } from './auth-context-provider';
import { useSignInForm } from '../hooks/use-login';
import React, { useEffect } from 'react'
import { FormProvider } from 'react-hook-form';

interface Props {
    children:React.ReactNode;
}
const SignInFormProvider:React.FC<Props> = ({
    children
}) => {
    const {methods, onHandleSubmit,loading} = useSignInForm()
    const {toast} = useToast();
  return (
    <AuthContextProvider>
        <FormProvider {...methods}>
            <form 
            onSubmit={onHandleSubmit}
            >
                <div>
                    <Loader loading={loading}>
                        {children}
                    </Loader>
                </div>
            </form>
        </FormProvider>
    </AuthContextProvider>
  )
}

export default SignInFormProvider