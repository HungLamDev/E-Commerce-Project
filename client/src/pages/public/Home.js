import React from 'react'
import {Sidebar,Banner,Sidebarright} from '../../components'
const Home = () =>{
    return (
        <div className='w-main flex'>
            <div className='flex flex-col gap-5 w-[20%] flex-auto border'>
                <Sidebar />
                <span>
                    Deal daily
                </span>
            </div>
            <div className='flex flex-col gap-5 pr-3 w-[55%] flex-auto border '>
                <Banner />
                <span>
                    Best seller
                </span>
            </div>
            <div className='flex flex-col gap-5 w-[25%] flex-auto border'>
                <Sidebarright />
            </div>
        </div>
    )
}
export default Home