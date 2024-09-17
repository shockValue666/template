import SideNav from '@/components/dashboard/sidenav/sidenav'
import SignUps from '@/components/dashboard/signups'
import Stats from '@/components/dashboard/stats'
import Subscriptions from '@/components/dashboard/subscriptions'
import React from 'react'

const Layout = ({children,analytics, team}:{children:React.ReactNode, analytics:React.ReactNode, team:React.ReactNode}) => {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64">
            <SideNav/>
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12 ">
            {/* {children} */}
            <div className='grid gap-x-4 gap-y-8 md:grid-cols-2 grid-rows-auto md:grid-rows-[auto,auto]'>
              {/* Top Row (1 column) */}
              <div className='md:col-span-2 '>
                  <Stats/>
              </div>
              {/* Bottom row first column */}
              <div className='h-[600px] overflow-hidden'>
                  {/* <Subscriptions/> */}
                  {team}
              </div>
              {/* bottom row second column */}
              <div className=''>
                  <SignUps/>
              </div>
              <div>
                  {/* <InvoicesTable searchParams={{page,query}}/> */}
              </div>
          </div>
        </div>
    </div>
  )
}

export default Layout