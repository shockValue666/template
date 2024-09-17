"use client"
import React, {useState} from 'react';

type InitialValuesProps = {
    currentStep: number;
    setCurrentStep: React.Dispatch<React.SetStateAction<number>>;   
}

const InitialValues: InitialValuesProps = {
    currentStep: 1,
    setCurrentStep: () => undefined,
}

const authStepContext = React.createContext(InitialValues);

const {Provider} = authStepContext;

export const AuthStepContextProvider = ({children} : {children:React.ReactNode}) => {
    const [currentStep, setCurrentStep] = useState<number>(InitialValues.currentStep);
    const values = {
        currentStep,
        setCurrentStep
    }

    return <Provider value={values}>{children}</Provider>
}

export const useAuthStepContextHook = () => {
    const state = React.useContext(authStepContext);
    return state;
}