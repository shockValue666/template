"use server";

import { client } from "@/lib/prisma";
const ITEMS_PER_PAGE = 6;

export const fetchFilteredInvoices = async (query:string, currentPage:number) => {
    console.log("query: ",query)
    try {
        const invoices = await client.invoice.findMany({
            where:{
                OR:[
                    {
                        status:{
                            contains:query,
                            mode:"insensitive"
                        },
                    },
                    {
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
            skip:currentPage===1 ? 0 : (currentPage-1)*ITEMS_PER_PAGE,
            
            
        })

        const totalCount = await client.invoice.count({
            where: {
                OR: [
                    {
                        status: {
                            contains: query,
                            mode: "insensitive",
                        },
                    },
                    {
                        user: {
                            OR: [
                                {
                                    email: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                                {
                                    name: {
                                        contains: query,
                                        mode: "insensitive",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        });
        if(invoices && totalCount){
            console.log("found invoices: ",invoices, totalCount)
            return {invoices,totalCount};
        }else{
            console.log("no invoices found: ",invoices)
        }
    } catch (error) {
        console.log("error fetching invoices: ",error)
    }
}

export const fetchNumberOfInvoices = async (numberOfInvoices:number) => {
    try {
        const invoices = await client.invoice.findMany({
            orderBy:{
                issuedAt:"desc"
            },
            take:numberOfInvoices,
            skip:0,
            include:{
                user:true
            }
        })
        console.log("invoices: ",invoices)
        return invoices;
    } catch (error) {
        console.log("error fetching invoices: ",error)
    }
}