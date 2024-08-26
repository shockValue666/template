"use client";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import {ColumnDef} from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react';

export type Payment = {
    id:string,
    amount: number,
    status: "pending" | "processing" | "success" | "failed",
    email:string
}

export type Invoice = {
    issuedAt:Date,
    amount:number,
    id:string,
    status:string
    paidAt:Date | null,
    user:{
        name:string | null,
        email:string,
        id:string
    },
    // user:{name:string, email:string}
}

function formatDateToGMT(dateString:Date) {   
     const date = new Date(dateString);

    // Extract day, month, year, hours, and minutes in GMT
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getUTCFullYear();

    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');

    // Format the date and time in DD/MM/YYYY HH:MM:SS GMT
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds} GMT`;   
}

export const columns:ColumnDef<Invoice>[] = [
    {
        accessorKey:"issuedAt",
        header:()=><div className="text-center">
            Issued At
        </div>,
        cell:(({row})=>{
            const paidAt = row.getValue("issuedAt")
            let formatted="N/A";
            if(paidAt && paidAt instanceof Date){
                formatted = formatDateToGMT(paidAt)
            }
            return (
                <div>
                    {formatted}
                </div>
            )
        })
    }
    ,
    {
        accessorKey:"amount",
        header: ()=> <div className='text-right'>Amount</div>,
        cell: ({row}) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US",{
                style:"currency",
                currency:"USD"
            }).format(amount)

            return (
                <div className='text-right font-medium'>
                    {formatted}
                </div>
            )
        }
    }
    ,
    {
        accessorKey:"id",
        header:"id",
    }
    ,
    {
        accessorKey:"stratus",
        header:"status",
    }
    ,
    {
        accessorKey:"paidAt",
        header:() => <div className='text-center'>Paid At</div>,
        cell:(({row})=>{
            const paidAt = row.getValue("paidAt")
            let formatted="N/A";
            if(paidAt && paidAt instanceof Date){
                formatted = formatDateToGMT(paidAt)
            }
            return (
                <div>
                    {formatted}
                </div>
            )
        })
    }
    ,
    {
        accessorKey:"user.id",
        header:"userId",
    }
    ,
    {
        accessorKey:"user.name",
        header:"user name",
    }
    ,
    {
        accessorKey:"user.email",
        header:"user email",
    }
    ,
    // {
    //     accessorKey: 'id',
    //     header: 'ID',
    // },
    // {
    //     accessorKey: 'amount',
    //     header: ()=> <div className='text-right'>Amount</div>,
    //     cell: ({row}) => {
    //         const amount = parseFloat(row.getValue("amount"))
    //         const formatted = new Intl.NumberFormat("en-US",{
    //             style:"currency",
    //             currency:"USD"
    //         }).format(amount)

    //         return (
    //             <div className='text-right font-medium'>
    //                 {formatted}
    //             </div>
    //         )
    //     }
    // },
    {
        accessorKey: 'status',
        header: 'Status',
    },
    {
        accessorKey: 'email',
        header: 'Email',
    },
    {
        id:"actions",
        cell:({row})=>{
            const payment = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant={'ghost'} className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open Menu</span>
                            <MoreHorizontal className='h-4 w-4'/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>
                            Actions
                        </DropdownMenuLabel>
                        <DropdownMenuItem 
                            onClick={()=> navigator.clipboard.writeText(payment.id)}
                        >
                            Copy Payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem>
                            View customer
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            View payment details
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]