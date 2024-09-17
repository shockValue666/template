"use client";
import React,{useState} from 'react'

type InitialValuesProps = {
    currentQuestion: number;
    setCurrentQuestion: React.Dispatch<React.SetStateAction<number>>;
}

const InitialValues: InitialValuesProps = {
    currentQuestion: 1,
    setCurrentQuestion: () => {}
}

const authContext = React.createContext(InitialValues);
const {Provider} = authContext;

export const AuthContextProvider = ({children}:{children:React.ReactNode}) => {
    const [currentQuestion, setCurrentQuestion] = useState<number>(InitialValues.currentQuestion);
    const values = {
        currentQuestion,
        setCurrentQuestion
    }

    return (<Provider value={values}>
        {children}
    </Provider>)

}