import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {ErrorMessage} from '@hookform/error-message'
import { Textarea } from '@/components/ui/textarea'

type Props = {
    type: 'text' | 'email' | 'password',
    inputType: 'select' | 'input' | 'textarea',
    name:string,
    id:string
    
    placeholder:string,

    label?:string,
    register:UseFormRegister<FieldValues>,
    errors:FieldErrors<FieldValues>,
    
    lines?:number,
    form?:string,
    options?:{value:string, label:string, id:string}[],

}

const FormGenerator:React.FC<Props> = ({
    type,
    inputType,
    name,
    id,

    placeholder,

    label,
    register,
    errors,

    lines,
    form,
    options
}) => {


    switch(inputType) {
        case 'input':
        return (
            <Label className='flex flex-col gap-2' htmlFor={`input-${id}`}>
            {label && label}
            <Input 
                id={`input-${label}`}
                type={type}
                placeholder={placeholder}
                form={form}
                {...register(name)}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render = {({message})=>{
                    console.log("message: ",message)    
                return (
                <p className='text-red-400 mt-2'>
                    {message === "Required" ? "" : message}
                </p>
                )}}
            />
            </Label>
        )
        case "select":
        return(
            <Label htmlFor={`select-${label}`}>
            {label && label}
            <select
                form={form}
                id={`select-${label}`}
                {...register(name)}
            >
                {options?.length && 
                options.map(option=>{
                    return (
                    <option
                        value={option.value}
                        key={option.id}
                    >
                        {option.label}
                    </option>
                    )
                })
                }
            </select>
            <ErrorMessage
                errors={errors}
                name={name}
                render={(({message})=>(
                <p className='text-red-400 mt-2'>
                    {message === "Required" ? "" : message}
                </p>
                ))}
            />
            </Label>
        )
        case "textarea":
        return (
            <Label htmlFor={`textarea-${label}`} className='flex flex-col gap-2'>
            {label && label}
            <Textarea
                form={form}
                id={`input-${label}`}
                placeholder={placeholder}
                {...register(name)}
                rows={lines}
            />
            <ErrorMessage
                errors={errors}
                name={name}
                render = {({message})=>{
                return (
                    <p className='text-red-400 mt-2'>
                    {message === "Required" ? "" : message}
                    </p>
                )
                }}
            />
            </Label>
        )
        default:
            return (<>

            </>)
    }
  return (
    <div>FormGenerator</div>
  )
}

export default FormGenerator