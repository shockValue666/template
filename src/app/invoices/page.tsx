"use server"
import React from 'react'
import { columns } from './columns'
import DataTable from './data-table'
import { fetchFilteredInvoices, fetchNumberOfInvoices } from './actions'
import Search from './search'
import PaginationButtons from './pagination-buttons'
const getData = async () => {

    return [{
        id: "728ed52f",
        amount: 100,
        status: "pending" as const,
        email: "m@example.com",
    }]
}
const Page = async ({searchParams}:{searchParams:{
  page?:string,
  query?:string
}}) => {

  const currentPage=Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  console.log("currentPage: ",currentPage)
  console.log("query: ",query)
  const newdData = await fetchFilteredInvoices(query, currentPage)
  console.log("new data: ",newdData)
  if(newdData === undefined) return <div>No data</div>
    
  return (
    <div>
        <p>some component that is supposed to remain static</p>
        <Search/>
        <DataTable data={newdData.invoices} columns={columns} />
        <PaginationButtons firstDisabled={currentPage === 1 } lastDisabled={newdData.invoices.length < 6 || newdData.totalCount === currentPage*6}/>
    </div>
  )

}

export default Page