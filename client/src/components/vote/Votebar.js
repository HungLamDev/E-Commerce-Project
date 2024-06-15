import React, {useRef, useEffect, memo} from 'react';
import { AiFillStar } from 'react-icons/ai';

const Votebar = ({ number, ratings, ratingTotal }) => {
      const percentRef = useRef()
      useEffect(() => {
            const percent = Math.round((ratings * 100)/ratingTotal) || 0
            percentRef.current.style.cssText = `right: ${100 - percent}%`
      }, [ratings,ratingTotal]) 
      return (
            <div className='flex gap-2 text-sm text-gray-500'>
                  <div className='w-[10%] flex justify-center items-center gap- text-sm '>
                        <span>{number}</span>
                        <AiFillStar color='orange' />
                  </div>
                  <div className='w-[75%] pt-1'>
                        <div className='w-full h-[7px] relative bg-gray-200 rounded-md'>
                              <div ref={percentRef} className='absolute inset-0 bg-red-500'></div>
                        </div>
                  </div>
                  <div className='w-[15%] flex justify-center text-xs text-400'>
                        {`${ratings || 0} reviewer`}
                  </div>
            </div>

      );
}

export default memo(Votebar);
