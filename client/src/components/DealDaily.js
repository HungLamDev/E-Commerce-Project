import React, {useState, useEffect, memo} from 'react'
import icons from '../ultils/icons'
import {apiGetProducts} from '../apis/product'
import { formatMoney, renderStarFromNunber } from '../ultils/helpers';
import {Countdown} from './'
import { clear } from '@testing-library/user-event/dist/cjs/utility/clear.js';


const {AiFillStar,AiFillHeart,AiOutlineMenu } = icons
let idInterval
const DealDaily = () => {
  const [dealdaily, setdeldaily] = useState(null)
  const [liked, setLiked] = useState(false);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [expiretime, setExpiretime] = useState(false);

  const handleClick = () => {
      setLiked(!liked); 
  };
  const fetchDealDaily = async () => {
    const response = await apiGetProducts({limit: 1, page: Math.round(Math.random()* 1), totalRatings: 5 })
    if(response.success) {
      setdeldaily(response.Products[0])
      const h = 24 - new Date().getHours()
      const m = 60 - new Date().getMinutes()
      const s = 60 - new Date().getSeconds()
      setHour(h)
      setMinute(m)
      setSecond(s)
    }else{
      setHour(0)
      setMinute(59)
      setSecond(59)
    }
  }
  // useEffect(() => { 
  //   fetchDealDaily()
  // },[])
  useEffect(() => { 
    idInterval && clearInterval(idInterval)
    fetchDealDaily()
   },[expiretime])
   useEffect(() => { 
    idInterval = setInterval(() => {
      if (second > 0) {
        setSecond(prevSecond => prevSecond - 1);
      } else {
        if (minute > 0) {
          setMinute(prevMinute => {
            setSecond(59);
            return prevMinute - 1;
          });
        } else {
          if (hour > 0) {
            setHour(prevHour => {
              setMinute(59);
              setSecond(59);
              return prevHour - 1;
            });
          } else {
            setExpiretime(!expiretime);
          }
        }
      }
    }, 1000);
    return () => {
      clearInterval(idInterval);
    };
  }, [second,minute,hour,expiretime]);
  
  return (
    <div className='w-full border flex-auto'>
      <div className='flex items-center justify-between p-4 text-[20px]'>
        <span className='flex-2 flex justify-center'><AiFillStar color='red' size={20}/></span>
        <span className='flex-6 font-bold flex justify-center text-gray-700'>DEAL DAILY</span>
        <span className='flex-2'></span>
      </div>
      <div className='w-full flex flex-col items-center pt-8 gap-2 pb-2'>
        <img src={dealdaily?.images || ''} alt='' 
        className='w-full object-contain' />
        <span className='line-clamp-1 textSize-[20px]' >
              {dealdaily?.title}
          </span>
          <span>
              {`${formatMoney(dealdaily?.price)} VND`}
          </span>
      </div>
      <div className='flex p-4 border-t'>
        <div className='w-[60%] flex pt-1'>{renderStarFromNunber(dealdaily?.totalRatings)}</div>
        <div className='w-[30%] flex'>
            Yêu thích
        </div>
        <div className='w-[10%] pb-2'>
            <span onClick={handleClick} className ='hover:text-white cursor-pointer'>
                <AiFillHeart fontSize='25px' color={liked ? 'red' : '#b2a4a4'} />
            </span>
        </div>
      </div>
      <div className='px-4 pb-4'> 
        <div className='flex gap-2 mb-4 justify-center items-center'>
          <Countdown unit={'Hours'} number={hour} />
          <Countdown unit={'Minutes'} number={minute} />
          <Countdown unit={'Seconds'} number={second} />
        </div>
        <button type='button' className='flex gap-2 items-center justify-center w-full bg-main hover:bg-gray-800 text-white font-medium py-2'>
          <AiOutlineMenu />
          <span>Options</span>
        </button>
      </div>
    </div>
  )
}

export default memo(DealDaily)