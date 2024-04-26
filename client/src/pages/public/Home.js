import React from 'react'
import {Sidebar,Banner,Sidebarright, BestSeller,DealDaily, Dienthoai, Laptop, Tablet} from '../../components'

const Home = () =>{
    return (
        <div >
            <div className='w-main flex pt-3'>
                <div className='flex flex-col gap-5 w-[25%] '>
                    <div className='flex-auto border rounded-[10px] shadow-lg'>
                        <Sidebar />
                    </div>
                </div>
                
                <div className='flex flex-col gap-5 w-[50%] '>
                    <div className='pr-2 pl-2 flex-auto'>
                        <Banner />
                    </div>
                </div>
                <div className='flex flex-col gap-5 w-[25%] flex-auto'>
                    <Sidebarright />
                </div>
            </div>
            <div className='w-main flex pt-3'>
                <div className='flex flex-col gap-5 w-[25%] '>
                    <DealDaily />
                </div>
                <div className='flex flex-col gap-5 w-[75%] pl-2'>
                    <BestSeller />
                </div>
            </div>
            <div className='p-4 my-4'>
                <div>
                    <Dienthoai/>
                </div>
                <div className='pt-6'>
                    <Laptop/>
                </div>
                <div className='pt-6'>
                    <Tablet/>
                </div>
            </div>
        </div>
    )
}
export default Home