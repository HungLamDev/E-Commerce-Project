import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Smartphone/66359d49986b1bfd909e4855/Điện%20thoại%20Samsung%20Galaxy%20S24%20(128GB%2F256GB)');
  };

  return (
    <div className='w-full'>
      <img 
        src='https://images.fpt.shop/unsafe/fit-in/800x300/filters:quality(90):fill(white)/fptshop.com.vn/Uploads/Originals/2024/4/13/638485965827508624_F-H1_800x300.png' 
        alt='banner'
        className='w-full h-[280px] object-cont rounded-[5px] cursor-pointer'
        onClick={handleClick}
      />
    </div>
  );
};

export default Banner;
