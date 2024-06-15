import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebarright = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className='w-full'>
      <div className='pb-2'>
        <img 
          src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/s-student-banner-block-home-update (2).jpg'
          alt='bannerright'
          className='w-full object-contain rounded-[10px] cursor-pointer'
          onClick={() => handleClick('/laptop')}
        />
      </div>
      <div className='pb-2 pt-2'>
        <img 
          src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-ipad-th444.jpg' 
          alt='bannerright'
          className='w-full object-contain rounded-[10px] cursor-pointer'
          onClick={() => handleClick('/tablet')}
        />
      </div>
    </div>
  );
};

export default Sidebarright;
