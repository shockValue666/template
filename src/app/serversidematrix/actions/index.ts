"use server";

import { client } from "@/lib/prisma";
const ITEMS_PER_PAGE = 6;

export const fetchFilteredInvoices = async (query:string, currentPage:number) => {
    try {
        const invoices = await client.invoice.findMany({
            where:{
                OR:[
                    {
                        status:{
                            contains:query,
                            mode:"insensitive"
                        },
                        user:{
                            OR:[
                                {
                                    email:{
                                        contains:query,
                                        mode:"insensitive"
                                    }
                                },
                                {
                                    name:{
                                        contains:query,
                                        mode:"insensitive"
                                    }
                                }
                            ]
                        },
                    }
                ]
            },
            select:{
                issuedAt:true,
                amount:true,
                id:true,
                status:true,
                paidAt:true,
                user:{
                    select:{
                        id:true,
                        name:true,
                        email:true
                    }
                }
            },
            orderBy:{
                issuedAt:"desc"
            },
            take:ITEMS_PER_PAGE,
            skip:currentPage*ITEMS_PER_PAGE,
            
            // include:{
            //     user:{
            //         select:{
            //             id:true,
            //             name:true,
            //             email:true
            //         }
            //     },
                
                
            // },
            // orderBy:{
            //     issuedAt:"desc"
            // },
            // take:ITEMS_PER_PAGE,
            // skip:currentPage*ITEMS_PER_PAGE,
        })
        return invoices;
    } catch (error) {
        console.log("error fetching invoices: ",error)
    }
}