import React from 'react'
import { FormProvider } from 'react-hook-form'
import { useRegisterForm } from '../hooks/use-register'

const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const {methods,onSubmit} = useRegisterForm()
  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  )
}

export default AuthProvider