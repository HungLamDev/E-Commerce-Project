import React, { memo, useState, useEffect } from 'react';
import icons from '../../ultils/icons';
import { colors } from '../../ultils/contants';
import { createSearchParams, useNavigate, useParams,useSearchParams } from 'react-router-dom';
import { apiGetProducts } from '../../apis';
import useDebounce from '../../hooks/useDebounce';
const { AiOutlineDown } = icons;

const SearchItem = ({ name, activeClick, changeActiveClick, type = 'checkbox' }) => {
const navigate = useNavigate();
const [params] = useSearchParams()
const { category } = useParams();
const [selected, setSelected] = useState([]);
const [bestPrice, setBestPrice] = useState(null);
const [price, setprice] = useState({
      from: '',
      to: ''
})
const handleSelect = (e) => {
      const alreadyEl = selected.find(el => el === e.target.value);
      if (alreadyEl) setSelected(prev => prev.filter(el => el !== e.target.value));
      else setSelected(prev => [...prev, e.target.value]);
      
};

const fetchBestpriceProduct = async () => { 
      const response = await apiGetProducts({ sort: '-price', limit: 1 });
      if (response.success && response.Products.length > 0) {
            setBestPrice(response.Products[0].price);
      }
};

useEffect(() => {
      let param = [];
      for (let i of params.entries()) param.push(i);
      const queries = {};
      for (let i of param) queries[i[0]] = i[1];
      if (selected.length > 0) {
        queries.color = selected.join(',');
        queries.page = 1;
      } else {
        delete queries.color;
      }
      navigate({
        pathname: `/${category}`,
        search: createSearchParams(queries).toString(),
      });
    }, [selected]);

useEffect(() => {
      if (type === 'input') fetchBestpriceProduct();
}, [type]);

const deboucePriceFrom = useDebounce(price.from, 500)
const deboucePriceTo = useDebounce(price.to, 500)
useEffect(() => {
      let param = [];
      for (let i of params.entries()) param.push(i);
      const queries = {};
      for (let i of param) queries[i[0]] = i[1];
      if (Number(price.from) > 0) {
            queries.from = price.from
      }else {
            delete queries.from
      }
      if (Number(price.to) > 0){ 
            queries.to = price.to
      }else {
            delete queries.to
      }
      queries.page = 1
      navigate({
            pathname:  `/${category}`,
            search: createSearchParams(queries).toString()
      })
}, [deboucePriceFrom,deboucePriceTo])


return (
      <div 
            className='text-gray-500 p-2 text-xs relative border border-gray-800 flex justify-between items-center rounded-[10px] pl-6 gap-4'
            onClick={() => changeActiveClick(name)}
      >
            <span className='capitalize'>{name}</span>
            <AiOutlineDown />
            {activeClick === name && (
            <div className='absolute z-10 top-[calc(100%+1px)] left-0 w-fit p-4 custom-border bg-white min-w-[150px]'>
                  {type === 'checkbox' && (
                        <>
                        <div className='p-4 items-center flex justify-between gap-8 border-b'>
                              <span className='whitespace-nowrap'>{`${(selected.length)} selected`}</span>
                              <span 
                                    onClick={e => {
                                    e.stopPropagation();
                                    setSelected([]);
                                    changeActiveClick(null)
                                    }} 
                                    className='underline cursor-pointer hover:text-main'
                              >
                                    Reset
                              </span>
                        </div>
                        <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                              {colors.map((el, index) => (
                                    <div key={index} className='flex items-center gap-4'>
                                    <input 
                                          type='checkbox' 
                                          className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 form-checkbox focus-within:hidden'
                                          value={el}
                                          onClick={handleSelect}
                                          id={el}
                                          checked={selected.some(selectedItem => selectedItem === el )}
                                    />
                                    <label className='capitalize text-gray-700' htmlFor={el}>{el}</label>
                                    </div>
                              ))}
                        </div>
                        </>
                  )}
                  {type === 'input' && ( <div onClick={e => e.stopPropagation()}>
                        <div className='p-4 items-center flex justify-between gap-8 border-b'>
                              <span className='whitespace-nowrap'>
                                    {`The highest price is ${bestPrice} VND`}
                              </span>
                              <span 
                                    onClick={e => {
                                          e.stopPropagation();
                                          setprice({from:'', to: ''});
                                          changeActiveClick(null)
                                    }} 
                                    className='underline cursor-pointer hover:text-main'
                              >
                                    Reset
                              </span>
                        </div>
                        <div className='flex items-center p-2 gap-2'>
                              <div className='flex items-center gap-2'>
                                    <label htmlFor='from'>From</label>
                                    <input className='form-input' 
                                    type='number' 
                                    id='from'
                                    value={price.from}
                                    onChange={e => setprice(prev => ({...prev, from: e.target.value}))}
                                    />
                              </div>
                              <div className='flex items-center gap-2'>
                                    <label htmlFor='to'>To</label>
                                    <input className='form-input' 
                                    type='number' 
                                    id='to'
                                    value={price.to}
                                    onChange={e => setprice(prev => ({...prev, to: e.target.value}))}
                                    />
                              </div>
                        </div>
                  </div>)}
            </div>
            )}
      </div>
);
};

export default memo(SearchItem);
