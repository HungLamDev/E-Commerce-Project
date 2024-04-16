import React from 'react'
import {Sidebar,Banner,Sidebarright} from '../../components'
const Home = () =>{
    return (
        <div className='w-main flex pt-3'>
            <div className='flex flex-col gap-5 w-[20%] flex-auto border rounded-[10px] shadow-lg '>
                <Sidebar />
            </div>
            <div className='flex flex-col gap-5 pr-2 pl-2 w-[55%] flex-auto'>
                <Banner />
            </div>
            <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                <Sidebarright />
            </div>
        </div>
    )
}
export default Home