import React, { memo } from 'react';
import clsx from 'clsx';
import { useSearchParams, useNavigate, useParams, createSearchParams } from 'react-router-dom';

const PagiItem = ({ children }) => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const {category} = useParams()
  const handlePagination = () => {
    let param = [];
    for (let i of params.entries()) param.push(i);
    console.log(param);
    const queries = {};
    for (let i of param) queries[i[0]] = i[1];
    if (Number(children)) queries.page = children
    console.log(queries);
    navigate({
      pathname: `/${category}`,
      search: createSearchParams(queries).toString()
    });
  };

  return (
    <button
      className={clsx('p-4 flex justify-center ', !Number(children) && 'items-end pb-2', 
      Number(children) && 'items-center hover:rounded-full hover:text-red-500 cursor-pointer', 
      +params.get('page') === +children && 'text-red-500', !+params.get('page') && +children === 1 && 'text-red-500') }
      onClick={handlePagination}
      type='button'
      disabled = {!Number(children)}
    >
      {children}
    </button>
  );
};

export default memo(PagiItem);