"use client";
import { Input } from '@/components/ui/input'
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'


function debounce<T extends (...args: any[]) => void>(func:T, wait:number) {
  let timeout:NodeJS.Timeout;

  return function executedFunction(...args:Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

const Search = () => {

    const currentUrlParams = useSearchParams();
    const currentPath = usePathname();
    const router = useRouter()

    useEffect(()=>{
        console.log("currentUrlParams: ",currentUrlParams, " currentPath: ",currentPath)
    })
    const handleChange = async (e:React.ChangeEvent<HTMLInputElement>) => {
        const params = new URLSearchParams(currentUrlParams)
        params.set("page","1")
        if(e.target.value){
            params.set("query",e.target.value)
        }else{
            params.delete("query")
        }
        router.replace(`${currentPath}/?${params.toString()}`)
    }
    const debouncedChange = debounce(handleChange, 500)
  return (
    <div className='w-full'>
        <Input
            type='text'
            placeholder='Search...'
            onChange={debouncedChange}
            className=''
        />
    </div>
  )
}

export default Search