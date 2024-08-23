import React from 'react'
import Stats from './stats'
import Subscriptions from './subscriptions'
import SignUps from './signups'

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
        DashboardMain
    </div>
  )
}

export default DashboardMain