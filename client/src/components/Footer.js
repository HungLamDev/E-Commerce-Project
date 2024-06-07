import React, { memo } from 'react'
import icons from '../ultils/icons'

const{MdEmail} = icons
const Footer = () => {
  return (
    <div className='w-full'>
      <div className='h-[103px] bg-orange-600 w-full flex items-center justify-center'>
        <div className='w-main justify-between flex '>
          <div className='flex-1'>
            <span className='text-white text-2xl'>SIGN UP TO NEWSLETTER</span><br/>
            <span className='text-gray-300'>Subscribe now and receive weekly newsletter</span>
          </div>
          <div className='flex-1 flex items-center'>
            <input 
            className='w-full border-none rounded-l-[30px] p-2 h-[50px] bg-[#e36e3b] outline-none text-gray-100 placeholder:text-gray-200 placeholder:text-[15px] placeholder:opacity-50 '
            type="text"
            placeholder='Email address'/>
            <div className='h-[50px] w-[56px] bg-[#e36e3b] p-2 rounded-r-[30px] flex items-center justify-center'>
              <MdEmail color='white' size={16}/>
            </div>
          </div>
        </div>
      </div>
      <div className='h-[407px] bg-gray-900 w-full flex items-center justify-center text-white text-[13px]'>
        <div className='w-main text-white flex'>
          <div className='flex-2 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-orange-500 pl-[15px]'>ABOUT US</h3>
            <span>
              <span>Address:</span>
              <span className='opacity-70'> 233/75c Nguyễn Văn Cừ, An Hòa, Ninh Kiều, Cần Thơ</span>
            </span>
            <span>
              <span>Phone:</span>
              <span className='opacity-70'> (+84) 0337525557</span>
            </span>
            <span>
              <span>Mail:</span>
              <span className='opacity-70'> doandangkhoa0711.gr@gmail.com</span>
            </span>
          </div>
          <div className='flex-1 flex flex-col gap-2'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-orange-500 pl-[15px]'>INFOMATION</h3>
            <span>Typography</span>
            <span>Gallery</span>
            <span>Store Location</span>
            <span>Today's Deals</span>
            <span>Contact</span>
          </div>
          <div className='flex-1'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-orange-500 pl-[15px]'>INFOMATION</h3>
            <span>Help</span>
            <span>Free Shipping</span>
            <span>FAQs</span>
            <span>Return & Exchange</span>
            <span>Testimonials</span>
          </div>
          <div className='flex-1'>
            <h3 className='mb-[20px] text-[15px] font-medium border-l-2 border-orange-500 pl-[15px]'>KHOAHUNGWORLDSTORE</h3>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(Footer)