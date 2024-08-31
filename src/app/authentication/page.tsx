"use client";
import React from 'react'
import { signUpAction, logout } from './actions'
import { useFormState } from 'react-dom';
import { FormState } from './types';

const Page = () => {
    const [state, action, pending] = useFormState(signUpAction,null)

  return (
    <div>
        <form action={action} className='mt-32 flex flex-col w-full items-center justify-center gap-y-8'>
            <div>
                <label htmlFor="name">username</label>
                <input type="text" name="name" id="name" placeholder='username'/>
            </div>
            {state && state?.errors && state?.errors.name && <p>{state?.errors.name}</p>}
            <div>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email" placeholder='email'/>
            </div>
            {state && state?.errors && state?.errors.email && <p>{state?.errors.email}</p>}
            <div>
                <label htmlFor="password">password</label>
                <input type="password" id="password" name="password" placeholder='password'/>
            </div>
            {state && state?.errors && state?.errors.password && <p>{state?.errors.password}</p>}
            <button type="submit" aria-disabled={pending}>
                {pending ? "Loading..." : "Signup"}
            </button>
        </form>
        <form action={logout} className='mt-10 text-center'>
            <button type="submit">
                Logout
            </button>
        </form>
    </div>
  )
}

export default Page