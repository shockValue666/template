import React from 'react'
import Search from './search'
import ServerMatrix from './server-matrix'
import DataTable from './data-table'
import { columns } from './columns'
import { fetchFilteredInvoices } from './actions'

const getData = async () => {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending" as const,
      email: "m@example.com",
    },
    {
      id: "a1b2c3d4",
      amount: 150,
      status: "pending" as const,
      email: "user1@example.com"
    },
    {
      id: "e5f6g7h8",
      amount: 200,
      status: "processing" as const,
      email: "user2@example.com"
    },
    {
      id: "i9j0k1l2",
      amount: 250,
      status: "pending" as const,
      email: "user3@example.com"
    },
    {
      id: "m3n4o5p6",
      amount: 300,
      status: "failed" as const,
      email: "user4@example.com"
    },
    {
      id: "q7r8s9t0",
      amount: 350,
      status: "pending" as const,
      email: "user5@example.com"
    },
    {
      id: "u1v2w3x4",
      amount: 400,
      status: "processing" as const,
      email: "user6@example.com"
    },
    {
      id: "y5z6a7b8",
      amount: 450,
      status: "pending" as const,
      email: "user7@example.com"
    },
    {
      id: "c9d0e1f2",
      amount: 500,
      status: "failed" as const,
      email: "user8@example.com"
    },
    {
      id: "g3h4i5j6",
      amount: 550,
      status: "pending" as const,
      email: "user9@example.com"
    },
    {
      id: "k7l8m9n0",
      amount: 600,
      status: "processing" as const,
      email: "user10@example.com"
    },
    {
      id: "o1p2q3r4",
      amount: 650,
      status: "pending" as const,
      email: "user11@example.com"
    },
    {
      id: "s5t6u7v8",
      amount: 700,
      status: "failed" as const,
      email: "user12@example.com"
    },
    {
      id: "w9x0y1z2",
      amount: 750,
      status: "processing" as const,
      email: "user13@example.com"
    },
    {
      id: "a3b4c5d6",
      amount: 800,
      status: "pending" as const,
      email: "user14@example.com"
    },
    {
      id: "e7f8g9h0",
      amount: 850,
      status: "failed" as const,
      email: "user15@example.com"
    },
    {
      id: "i1j2k3l4",
      amount: 900,
      status: "processing" as const,
      email: "user16@example.com"
    },
    {
      id: "m5n6o7p8",
      amount: 950,
      status: "pending" as const,
      email: "user17@example.com"
    },
    {
      id: "q9r0s1t2",
      amount: 1000,
      status: "failed" as const,
      email: "user18@example.com"
    },
    {
      id: "u3v4w5x6",
      amount: 1050,
      status: "processing" as const,
      email: "user19@example.com"
    },
    {
      id: "y7z8a9b0",
      amount: 1100,
      status: "pending" as const,
      email: "user20@example.com"
    }
  ]
}



const Page = async ({searchParams}:{searchParams?:{
    query?:string,
    page?:string
}}) => {
    const currentPage=Number(searchParams?.page) || 1;
    const query = searchParams?.query || "";
    console.log("searchParams: ",searchParams)
    const data = await getData()
    const newdata = await fetchFilteredInvoices(query, currentPage)
    console.log("new data: ",newdata)

  return (
    <div className='flex w-full items-center flex-col justify-center mt-10'>
        <Search/>
        {/* <ServerMatrix query={query} page={currentPage}/> */}
        <DataTable columns={columns} data={data}/>
        gilera
    </div>
  )
}

export default Page