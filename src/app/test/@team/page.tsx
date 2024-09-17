"use server"
import React from 'react'
import { columns } from './columns'
import DataTable from './data-table'
import { fetchFilteredInvoices, fetchNumberOfInvoices } from './actions'
import Search from './search'
import PaginationButtons from './pagination-buttons'

const Page = async ({searchParams}:{searchParams:{
  page?:string,
  query?:string
}}) => {

  const currentPage=Number(searchParams?.page) || 1;
  const query = searchParams?.query || "";

  console.log("currentPage: ",currentPage)
  console.log("query: ",query)
  const newdData = await fetchFilteredInvoices(query, currentPage)
    
  return (
    <div className='w-full h-full flex flex-col justify-center items-center p-2 box-border'>
      {/* <p className='mb-4'>some component that is supposed to remain static</p> */}
      <Search />
      {newdData ? 
      (
        <>
          <div className='w-full max-w-full overflow-auto mt-4'>
            <DataTable data={newdData.invoices} columns={columns} />
          </div>
          <PaginationButtons 
            firstDisabled={currentPage === 1 } 
            lastDisabled={newdData.invoices.length < 6 || newdData.totalCount === currentPage * 6}
            // className='mt-4 w-full max-w-md'
          />
        </>
      ) : (
        <div className='text-center my-12'>No data</div>
      )}
    </div>
  )

}

export default Page