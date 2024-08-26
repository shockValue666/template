"use server"
import React from 'react'
import { columns } from './columns'
import DataTable from './data-table'
import { fetchNumberOfInvoices } from './actions'
const getData = async () => {

    return [{
        id: "728ed52f",
        amount: 100,
        status: "pending" as const,
        email: "m@example.com",
    }]
}
const Page = async () => {
    const data = await getData();
    const newdData = await fetchNumberOfInvoices(10)
    console.log("new data: ",newdData)
    if(newdData === undefined) return <div>No data</div>
  return (
    <div>
        <DataTable data={newdData} columns={columns} />
    </div>
  )
}

export default Page