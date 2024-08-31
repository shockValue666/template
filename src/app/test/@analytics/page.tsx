import React from 'react'
import { someAction } from '../actions'

const Anal = async () => {
  const data = await someAction();
  if(!data) return <div>No data</div>
  return (
    <div>{data}</div>
  )
}

export default Anal