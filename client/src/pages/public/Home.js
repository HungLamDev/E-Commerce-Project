import React, {useEffect, useState} from 'react'
import {Sidebar,Banner,Sidebarright, BestSeller} from '../../components'

const Home = () =>{
    return (
        <div >
            <div className='w-main flex pt-3'>
                <div className='flex flex-col gap-5 w-[20%] '>
                    <div className='flex-auto border rounded-[10px] shadow-lg'>
                        <Sidebar />
                    </div>
                </div>
                
                <div className='flex flex-col gap-5 w-[55%] '>
                    <div className='pr-2 pl-2 flex-auto'>
                        <Banner />
                    </div>
                </div>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebarright />
                </div>
            </div>
            <div className='w-main flex pt-3'>
                <div className='flex flex-col gap-5 w-[20%] '>a</div>
                <div className='flex flex-col gap-5 w-[80%] pl-2'>
                    <BestSeller />
                </div>
            </div>
        </div>
    )
}
export default Home