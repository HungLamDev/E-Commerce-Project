import React,{useEffect, useState}from 'react';
import { useParams } from 'react-router-dom';
import { apiGetproduct } from '../../apis';
const DetailProduct = () => {
  const { pid, title } = useParams();
  const fetchProductData = async () =>{
    const response = await apiGetproduct(pid)
    console.log(response);
  }
  useEffect(() => {
    if(pid) fetchProductData()
  }, [pid])
  
  return (
    <div className='w-full pt-2'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          {title}
        </div>
      </div>
    </div>
  );
}

export default DetailProduct; 
