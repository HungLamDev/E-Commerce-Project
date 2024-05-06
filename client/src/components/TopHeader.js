import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import path from '../ultils/path'
const TopHeader = () => {
  return (
    <div className='h-[45px] w-full bg-orange-600 flex items-center justify-center'>
      <div className='w-main flex justify-between text-slate-50'>
        <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
        <Link className='hover:text-gray-800' to={`/${path.LOGIN}`}>Sign In or Create Account</Link>
      </div>
    </div>
  )
}


export default memo(TopHeader)