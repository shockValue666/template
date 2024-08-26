import DashboardMain from '@/components/dashboard/dashboard-main'
import React from 'react'

const Page = ({searchParams}:{searchParams:{page:number,query:string}}) => {
  return (
    <div>
      <DashboardMain page={searchParams.page} query={searchParams.query}/>
    </div>
  )
}

export default Page