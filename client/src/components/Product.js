import React from 'react';

const Product = ({ productData }) => {
    return (
        <div className='w-full text-base px-[10px]'>
            <div className='w-full border'>
                <img src={productData?.images[0] || ''} alt='' className='w-[243px] h-[243px] object-cover' />
                <div className='flex flex-col gap-2 '>
                    <span className='line-clamp-1'>
                        {productData?.title}
                    </span>
                    <span>
                        {`${productData?.price} VND`}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Product;
