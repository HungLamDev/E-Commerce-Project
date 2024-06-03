import React, { useState } from 'react';
import icons from '../ultils/icons';
import { formatMoney, renderStarFromNunber } from '../ultils/helpers';
import { Link } from 'react-router-dom';
import path from '../ultils/path'
const { AiFillHeart } = icons;

const Product = ({ productData}) => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked); 
    };
    function customEncodeURIComponent(str) {
        return str.replace(/\//g, '%2F');
    }
    const encodedTitle = customEncodeURIComponent(productData?.title);
    return (
        <div className='w-full text-base px-[10px] hover:text-black cursor-pointer border rounded-[15px]'>
            <Link 
                to={`/${productData?.category?.toLowerCase()}/${productData?._id}/${encodedTitle}`}
            >
                <div className='w-full relative pt-2'>
                    <img src={productData?.images[0] || ''} alt='' className='w-[180px] h-[180px] object-cover' />
                </div>
                <div className='flex flex-col gap-2 items-center justify-center mt-[15px] pb-2'>
                    <span className='line-clamp-2 text-sm'>
                        {productData?.title}
                    </span>
                    <span className='text-sm'>
                        {`${formatMoney(productData?.price)} VND`}
                    </span>
                </div>
            </Link>
            <div className='flex pt-2 border-t p-2'>
                    <div className='w-[50%] flex pt-1 text-sm'>{renderStarFromNunber(productData?.totalRatings)}</div>
                    <div className='w-[40%] flex text-sm'>
                        Yêu thích
                    </div>
                    <div className='w-[5%] pb-1'>
                        <span onClick={handleClick} className ='hover:text-white cursor-pointer'>
                            <AiFillHeart fontSize='20px' color={liked ? 'red' : '#b2a4a4'} />
                        </span>
                    </div>
            </div>
        </div>
    );
};

export default Product;
