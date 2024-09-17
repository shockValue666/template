"use client";

import React, { createContext, SetStateAction, useContext, useState } from "react";

type InitialValueProps = {
    step:number,
    setStep:React.Dispatch<SetStateAction<number>>
}

const InitialValues: InitialValueProps = {
    step: 1,
    setStep: () => undefined
}

const stepContext = createContext(InitialValues);

const {Provider} = stepContext;

export const StepContextProvider = ({children} : {children:React.ReactNode}) => {
    const [step, setStep] = useState<number>(InitialValues.step);
    const values = {
        step,
        setStep
    }
    return (<Provider value={values}>
        {children}
    </Provider>)
}

export const useStepContext = () => {
    const state = useContext(stepContext)
    return state;
}
