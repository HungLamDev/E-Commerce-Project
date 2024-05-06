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
            <div className='w-full border p-[15px] rounded-[10px]'>
                <div className='w-full relative'>
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
                <div className='flex pt-2 border-t'>
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
        </div>
    );
};

export default Product;
