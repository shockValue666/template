import React from 'react'
import Stats from './stats'
import Subscriptions from './subscriptions'
import SignUps from './signups'
import InvoicesTable from './invoices-matrix/page'

interface Props{
  page:number,
  query:string
}

const DashboardMain = () => {
  return (
    <div className='grid gap-x-4 gap-y-8 md:grid-cols-2 grid-rows-auto md:grid-rows-[auto,auto]'>
        {/* Top Row (1 column) */}
        <div className='md:col-span-2 '>
            <Stats/>
        </div>
        {/* Bottom row first column */}
        <div className=' '>
            <Subscriptions/>
        </div>
        {/* bottom row second column */}
        <div className=''>
            <SignUps/>
        </div>
        <div>
            {/* <InvoicesTable searchParams={{page,query}}/> */}
        </div>
    </div>
  )
}

export default DashboardMain