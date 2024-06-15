import React, { memo } from 'react';
import { useSearchParams } from 'react-router-dom';
import usePagination from '../../hooks/usePagination';
import PagiItem from './PagiItem';

const Pagination = ({ totalCount}) => {
  const [params] = useSearchParams();
  const currentPage = +params.get('page') || 1; 
  const pageSize = +process.env.REACT_APP_LIMIT || 10;
  const pagination = usePagination(totalCount, currentPage);

  const range = () => {
    const start = ((currentPage - 1) * pageSize) + 1;
    const end = Math.min(currentPage * pageSize, totalCount);
    return `${start} - ${end}`;
  };

  return (
    <div className='w-main flex justify-between items-center'>
      <span className='text-sm italic'>
        {`Trang ${currentPage} (${range()}) of ${totalCount}`}
      </span>
      <div className="flex">
        {pagination?.map(el => (
          <PagiItem key={el}>
            {el}
          </PagiItem>
        ))}
      </div>
    </div>
  );
};

export default memo(Pagination);
