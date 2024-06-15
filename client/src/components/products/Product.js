import React, { memo, useState } from 'react';
import icons from '../../ultils/icons';
import { formatMoney, renderStarFromNunber } from '../../ultils/helpers';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import path from '../../ultils/path';



const { AiFillHeart } = icons;

const Product = ({ productData, isNew }) => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked); 
    };
    function customEncodeURIComponent(str) {
        return str.replace(/\//g, '%2F'); // Thay thế dấu / bằng %2F
    }
    const encodedTitle = customEncodeURIComponent(productData?.title);
    return (
        <div className='w-full text-base px-[10px] '>
            <Link
            
                to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${encodedTitle}`}
            >
                <div className='w-full border p-[15px]'>
                    <div className='pb-6'>
                        {isNew ? <span className='border px-4 pt-1 pb-1 rounded-[20px] text-yellow-500'>New</span> : null}
                    </div>
                    <div className='w-full relative'>
                        <img src={productData?.images[0] || ''} alt='' className='w-[243px] h-[243px] object-cover' />
                    </div>
                    <div className='flex flex-col gap-2 items-center justify-center mt-[15px] pb-2'>
                        <span className='line-clamp-1 textSize-[20px]' >
                            {productData?.title}
                        </span>
                        <span className=''>
                            {`${formatMoney(productData?.price)} VND`}
                        </span>
                    </div>
                </div>
            </Link>
            <div className='flex pt-5 border-r border-l border-b'>
            <div className='w-[55%] flex pl-2 pt-1'>{renderStarFromNunber(productData?.totalRatings)?.map((el, index) => (
                <div key={index}>{el}</div>
            ))}
                </div>
                <div className='w-[35%] flex pr-2 pb-1'>
                    Yêu thích
                </div>
                <div className='w-[15%] pb-3 pr-2'>
                    <span onClick={handleClick} className='hover:text-white cursor-pointer'>
                        <AiFillHeart fontSize='25px' color={liked ? 'red' : '#b2a4a4'} />
                    </span>
                </div>
            </div>
        </div>
    );
};

export default memo(Product);
