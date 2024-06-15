import React, { useState, useEffect, memo } from 'react';
import { apiGetProducts } from '../../apis/product';
import Productbanner from './Productbanner';

const Similar = ({ category }) => {
    const [similarProducts, setSimilarProducts] = useState([]);

    const fetchSimilar = async () => {
        try {
            const response = await apiGetProducts({ limit: 10, category: category || '' });
            
            if (response?.success) {
                setSimilarProducts(response.Products);
            }
        } catch (error) {
            console.error('Error fetching Similar:', error);
        }
    };

    useEffect(() => {
        fetchSimilar();
    }, [category]); // Trigger fetchSimilar when category changes

    return (
        <div className='w-full text-base px-[10px] pr-2'>
            <div className='mt-4 mx-[-10px] flex flex-wrap'>
                  {similarProducts?.map((product, index) => (
                        <div key={index} className='w-1/5 px-2 mb-4'>
                              <Productbanner
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

export default memo(Similar);
