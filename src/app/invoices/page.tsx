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
    // const newdData = await fetchNumberOfInvoices(10)
    const newdData = [{
    id: 'a1065f0d-df3f-4480-862d-2b8304ac1695',
    userId: '862f5903-1308-44df-954d-ffcc416a5f4d',
    amount: 671.0512949674487,
    status: 'pending',
    issuedAt: new Date(),
    paidAt: new Date(),
    user: {
      id: '862f5903-1308-44df-954d-ffcc416a5f4d',
      email: 'DianaE@example.com',
      name: 'Diana Evans'
    }
  },
  {
    id: 'b83a2feb-f811-42d8-8571-eacf88d63871',
    userId: '1c32ad54-4f52-4be9-bc5e-6fa0807cc409',
    amount: 38.65637079558093,
    status: 'pending',
    issuedAt: new Date(),
    paidAt: new Date(),
    user: {
      id: '1c32ad54-4f52-4be9-bc5e-6fa0807cc409',
      email: 'GeorgeK@example.com',
      name: 'George King'
    }
  },]
    if(!newdData) return <div>No data</div>
  return (
    <div>
        <DataTable data={newdData} columns={columns} />
    </div>
  )
}

export default Page