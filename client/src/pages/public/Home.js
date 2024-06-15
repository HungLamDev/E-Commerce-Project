import React from 'react'
import {Sidebar,Banner,Sidebarright, BestSeller,DealDaily, Dienthoai, Laptop, Camera} from '../../components'
import {useSelector} from 'react-redux'
import icons from '../../ultils/icons'
const {IoIosArrowForward} = icons
const Home = () =>{

    const {categories} = useSelector(state => state.app)
    return (
        <div className='mt-4 w-main'>
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
                    <Camera/>
                </div>
            </div>
            
            <div className='w-main p-4 my-4'>
                <h3 className='font-semibold flex text-gray-800 text-[30px] pb-4 border-b-2 border-main'>Hot Collections</h3>
                <div className='flex flex-wrap'>
                {categories?.filter(el => el.brand.length > 0).map((el, index) => (  
                        <div 
                            key={el._id || index}
                            className='w-[396px] p-4'
                        >
                            <div className='flex border min-h-[202px] pt-2'>
                                <img src={el.image} alt='' className=' w-[160px] h-[170px] object-contain'/>
                                <div className='pl-8 text-gray-800 pt-2'> 
                                    <h4 className='font-semibold uppercase'>{el.title}</h4>
                                    <ul className='text-sm pt-2'>
                                        {el?.brand?.map(item =>(
                                            <span key={item} className='flex gap-1 items-center text-gray-500'>
                                                <IoIosArrowForward size={14}/>
                                                <li> {item}</li>
                                            </span>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            
        </div>
    )
}
export default Home