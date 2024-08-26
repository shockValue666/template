"use client";
import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Search = () => {

    const searchParams = useSearchParams();
    const pathName = usePathname();
    const router=useRouter();

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log("e.target.value: ",e.target.value)
        const params = new URLSearchParams(searchParams)
        params.set("page","1")
        if(e.target.value){
            params.set("query",e.target.value)
        }else{
            params.delete("query")
        }
        router.replace(`${pathName}?${params.toString()}`)



    }
  return (
    <Input
        type='text'
        placeholder='Search...'
        className='w-1/2'
        onChange={handleSearch}
    />
  )
}

export default Search