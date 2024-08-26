"use client";
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

interface Props {
    firstDisabled:boolean,
    lastDisabled:boolean
}

const PaginationButtons:React.FC<Props> = ({
    firstDisabled,
    lastDisabled
}) => {

    const currentPathname = usePathname()
    const currentUrlSearchParams = useSearchParams()
    const router = useRouter();

    const handlePrevious = async (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {

        const params = new URLSearchParams(currentUrlSearchParams)
        const page = Number(params.get("page"))
        params.set("page",(page-1).toString())
        const newURL = `${currentPathname}?${params.toString()}`
        router.replace(newURL)
    }

    const handleNext = async (e:React.MouseEvent<HTMLButtonElement,MouseEvent>) => {
        const params = new URLSearchParams(currentUrlSearchParams)
        const page = Number(params.get("page"))
        console.log("page from handlenext: ",page)
        if(page===undefined || page===null || !page){
            params.set("page","2")    
        }
        params.set("page",(page+1).toString())
        const newURL = `${currentPathname}?${params.toString()}`
        router.replace(newURL)
    }
  return (
    <div className='flex justify-center gap-x-4'> 
        <Button disabled={firstDisabled} variant={"outline"} onClick={handlePrevious}>
            <ArrowLeft/>
        </Button>
        <Button disabled={lastDisabled} variant={"outline"} onClick={handleNext}>
            <ArrowRight/>
        </Button>
    </div>
  )
}

export default PaginationButtons