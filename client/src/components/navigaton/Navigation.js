import React, { memo, useState, useEffect } from 'react';
import { navigation } from '../../ultils/contants';
import { NavLink } from 'react-router-dom';
import InputManage from 'components/inputs/InputManage';
import useDebounce from 'hooks/useDebounce';
import { apiGetproduct } from 'apis/product'; 

const Navigation = () => {
    // const [products, setProducts] = useState(null);
    // const [queries, setQueries] = useState({ q: "" });
    // const queriesDebounce = useDebounce(queries.q, 800);

    // useEffect(() => {
    //     const fetchProducts = async (params) => {
    //         const response = await apiGetproduct(params);
    //         if (response.success) {
    //             setProducts(response.Products);
    //         }
    //     };

    //     const params = {};
    //     if (queriesDebounce) params.q = queriesDebounce;
    //     fetchProducts(params);
    // }, [queriesDebounce]);

    return (
        <div className='w-main h-[48px] py-2 border-b text-sm flex items-center'> 
            <div className='w-[70%]'>
                {navigation.map(el => (
                    <NavLink 
                        to={el.path}
                        key={el.id}
                        className={({ isActive }) => isActive ? 'pr-12 hover:text-main text-main' : 'pr-12 hover:text-main'}
                    >
                        {el.value}
                    </NavLink>
                ))}
            </div>
            {/* <div className='flex justify-end'>
                <InputManage 
                    nameKey={'q'}
                    value={queries.q}
                    setValue={setQueries}
                    style='w-500'
                    placeholder='Search name product...'
                    isHideLabel
                />
            </div> */}
        </div>
    );
};

export default memo(Navigation);
