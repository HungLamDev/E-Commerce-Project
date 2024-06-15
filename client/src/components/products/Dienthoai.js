import React, { useState, useEffect, memo } from 'react';
import { apiGetProducts } from '../../apis/product';
import Product from './Productbanner';

const Dienthoai = () => {
    const [dienthoai, setDienthoai] = useState([]);

    const fetchDienthoai = async () => {
        try {
            const response = await apiGetProducts({ limit: 5, category: 'Smartphone' })
            if (response?.success) {
                setDienthoai(response.Products);
            }
        } catch (error) {
            console.error('Error fetching Dienthoai:', error);
        }
    };

    useEffect(() => {
        fetchDienthoai();
    }, []);

    return (
        <div className='w-full text-base px-[10px] pr-2'>
            <h3 className='font-semibold flex text-gray-800 text-[30px] pb-4 border-b-2 border-orange-600'>Điện Thoại</h3>
            <div className='mt-4 mx-[-10px] flex flex-wrap'>
                {dienthoai?.map((product, index) => (
                    <div key={index} className='w-1/5 px-2 mb-4'>
                        <Product 
                            key={product.id}
                            pid={product.id}
                            productData={product}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default memo(Dienthoai);
