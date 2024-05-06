import React, { useState } from 'react';
import icons from '../ultils/icons';
import { formatMoney, renderStarFromNunber } from '../ultils/helpers';

const { AiFillHeart } = icons;

const Product = ({ productData, isNew }) => {
    const [liked, setLiked] = useState(false);

    const handleClick = () => {
        setLiked(!liked); 
    };
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border p-[15px] '>
                <div className='pb-6'>
                    {isNew ? <span className='border px-4 pt-1 pb-1 rounded-[20px] text-red-600 bg-yellow-300'>New</span> : null}
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
                <div className='flex pt-4 border-t'>
                    <div className='w-[60%] flex pt-1'>{renderStarFromNunber(productData?.totalRatings)}</div>
                    <div className='w-[30%] flex'>
                        Yêu thích
                    </div>
                    <div className='w-[10%] pb-2'>
                        <span onClick={handleClick} className ='hover:text-white cursor-pointer'>
                            <AiFillHeart fontSize='25px' color={liked ? 'red' : '#b2a4a4'} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
