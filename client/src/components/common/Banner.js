import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Smartphone/666442a94c3b0f71ea637031/Xiaomi%2014%20Ultra%205G%20(16GB%20512GB)');
  };

  return (
    <div className='w-full'>
      <img 
        src='https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/xiaomi-14-ultra-sliding-31-5-2024.jpg' 
        alt='banner'
        className='w-full h-[280px] object-cont rounded-[5px] cursor-pointer'
        onClick={handleClick}
      />
    </div>
  );
};

export default memo(Banner);
