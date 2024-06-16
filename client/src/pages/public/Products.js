import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate, createSearchParams } from 'react-router-dom';
import { Breadcrumb, SearchItem, InputSelect } from '../../components';
import { apiGetProducts } from '../../apis';
import Masonry from 'react-masonry-css';
import Product from '../../components/products/Product';
import { sorts } from '../../ultils/contants';
import Pagination from '../../components/Pagination/Pagination';

const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const [activeClick, setActiveClick] = useState(null);
  const [sort, setSort] = useState('');
  const [params] = useSearchParams()
  const fetchProductsByCategory = async (queries) => {
    try {
      const response = await apiGetProducts({...queries, limit: process.env.REACT_APP_LIMIT });
      if (response.success) {
        setProducts(response);
      } else {
        console.error("Failed to fetch products:", response.error);
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };
  

  useEffect(() => {
    const queries = Object.fromEntries([...params])
    let priceQuery = {}
    if(queries.from && queries.to){
      priceQuery = { $and: [
        {price: {gte: queries.from}},
        {price: {lte: queries.to}}
      ]}
      delete queries.price
     }else{
      if(queries.from){queries.price = {gte: queries.from}}
      if(queries.to){queries.price = {lte: queries.to}}
      }
    
    delete queries.from
    delete queries.to
    
    
    const a = {...priceQuery, ...queries}
    fetchProductsByCategory(a);
    window.scrollTo(0,0)
  }, [searchParams]);

  const changeActiveClick = useCallback((name) => {
    if (activeClick === name) setActiveClick(null);
    else setActiveClick(name);
  }, [activeClick]);

  const changeValue = useCallback((value) => {
    setSort(value);
  }, [sort]);

  useEffect(() => {
    if(sort) {
      navigate({
        pathname: `/${category}`,
        search: createSearchParams({ sort }).toString()
      });
    }
  }, [sort]);

  return (
    <div className='w-full'>
      <div className='h-[81px] flex items-center justify-center bg-gray-100'>
        <div className='w-main'>
          <h3 className='font-semibold uppercase'>{category}</h3>
          <Breadcrumb category={category} />
        </div>
      </div>
      <div className='w-main border p-4 flex justify-between mt-8 m-auto'>
        <div className='w-4/5 flex-auto flex-col flex'>
          <span className='uppercase font-semibold'>Filter By</span>
          <div className='flex items-center gap-4 pt-2'>
            <SearchItem
              name='Price'
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
              type='input'
            />
            <SearchItem
              name='Color'
              activeClick={activeClick}
              changeActiveClick={changeActiveClick}
            />
          </div>
        </div>
        <div className='w-1/5 flex flex-col'>
          <span className='uppercase font-semibold'>Sort By</span>
          <div className='pt-2'>
            <InputSelect changeValue={changeValue} value={sort} options={sorts} />
          </div>
        </div>
      </div>
      <div className='w-main mt-8 m-auto'>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {products?.Products?.map((el) => (
            <Product 
              key={el.id || el._id} 
              pid={el.id} 
              productData={el} 
              normal={true}
            />
          ))}
        </Masonry>
      </div>
      <div className='w-main m-auto my-4 flex justify-end'>
        <Pagination
          totalCount={products?.counts}

        />
      </div>
      <div className='w-full h-[500px]'>
      </div>
    </div>
  );
};

export default Products;
