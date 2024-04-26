import React, { useState, useEffect } from 'react';
import { apiGetProducts } from '../apis/product';
import Slider from 'react-slick';
import Product from './Productbanner';

const Dienthoai = () => {
    const [dienthoai, setDienthoai] = useState([]);

    const fetchDienthoai = async () => {
        try {
            const response = await apiGetProducts({ limit: 10, title: 'Điện Thoại',page: Math.round(Math.random()* 10) });
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
            <h3 className='font-semibold flex text-gray-800 text-[30px] pb-4 border-b-2 border-main'>Điện Thoại</h3>
            <div className='mt-4 mx-[-10px] flex flex-wrap'>
                {dienthoai?.map((product, index) => (
                    <div key={index} className='w-1/5 px-2 mb-4'>
                        <Product 
                            key={product.id}
                            pid={product.id}
                            productData={product}
                            isNew={false}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dienthoai;
