import React, { memo } from 'react';
import avatar from 'assets/avartar.jpg';
import moment from 'moment';
import { renderStarFromNunber } from '../../ultils/helpers';

const Showcoment = ({ image = avatar, name = 'Anonmyous', updatedAt, comment, star }) => {
  return (
    <div className='flex gap-4'>
      <div className='flex-none'>
        <img src={image} alt='avarta' className='w-[30px] h-[30px] object-cover rounded-full' />
      </div>
      <div className='flex flex-col flex-auto'>
        <div className='flex justify-between items-center pb-2'>
          <h3 className='font-semibold'>{name}</h3>
          <span className='text-xs italic'>{moment(updatedAt).fromNow()}</span>
        </div>
        <div className='flex flex-col gap-2 text-sm border border-gray-300 bg-gray-100 p-2 rounded-md' >
          <span className='flex'>
            <span className='font-semibold pr-2'>Đánh giá: </span>
            <div className='flex pt-1'>
              {renderStarFromNunber(star)?.map((el, index) => (
                <div key={index}>{el}</div>
              ))}
            </div>
          </span>
          <span className='flex'>
            <span className='font-semibold pr-2'>Nội dung: </span>
            <span>{comment}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default memo(Showcoment);
