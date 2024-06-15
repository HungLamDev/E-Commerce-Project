import React, { memo } from 'react'
import a from 'assets/a.jpg'
import icons  from '../../ultils/icons'
import {Link} from 'react-router-dom'
import path from '../../ultils/path'
import { useSelector } from 'react-redux';
const {BsTelephone,TfiEmail,BsCart,FaUserAlt} = icons
const Header = () =>{
    const { current } = useSelector(state => state.user);
    return (
        <div className='border-b flex w-main h-[110px]  justify-between'>
            <Link to={`/${path.HOME}`} >
            <img src={a} alt='a' className='object-contain w-full h-[90px] pt-[10px] '></img>
            </Link>
            <div className=' flex py-[36px] '>
                <div className='flex flex-col items-center px-6 border-r text-[13px]'>
                    <span className='flex gap-4 items-center'>
                        <BsTelephone color='orange'/>
                        <span className='font-semibold'>(+84) 337 525 557</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className='flex flex-col items-center px-6 border-r text-[13px]'>
                <span className='flex gap-4 items-center'>
                    <TfiEmail color='orange' />
                    <a href="mailto:doandangkhoa0711.gr@gmail.com" className='font-semibold'>doandangkhoa0711.gr@gmail.com</a>
                </span>
                    <span>Online Support 24/7</span>
                </div>
                {current && (
                    <>
                        <div className='cursor-pointer flex items-center justify-center gap-2 px-6 border-r'>
                            <BsCart color='orange' />
                            <span>0 items</span>
                        </div>
                        <Link 
                            className='cursor-pointer flex items-center justify-center px-6 gap-2'
                            to={+current.role === 1945 ?  `/${path.ADMIN}/${path.DASHBOARD}` :  `/${path.MEMBER}/${path.PERSONAL}`}
                        >
                            <FaUserAlt color='orange' />
                            <span>Profile</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    )
}
export default memo(Header)