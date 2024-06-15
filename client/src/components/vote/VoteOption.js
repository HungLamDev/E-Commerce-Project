import React, { memo, useRef, useEffect, useState } from 'react'
import a from 'assets/a.jpg'
import { VoteOptions } from '../../ultils/contants'
import icons from '../../ultils/icons';
import {Button} from '..'
const {AiFillStar} = icons
const VoteOption = ({title, handleSubmitVoteOption}) => {
      const [ChoseScore, setChoseScore] = useState(null)
      const modalRef = useRef()
      const [comment, setComment] = useState('')
      useEffect(() => {
            modalRef.current.scrollIntoView({block: 'center', behavior: 'smooth'})
      }, [])
      return (
            <div onClick={e => e.stopPropagation()} ref={modalRef} className='bg-white w-[700px] p-4 flex-col gap-4 flex items-center justify-center'>
            <img src={a} alt='logo' className='w-[300px] my-8 object-contain' />
            <h2 className='text-center text-medium text-lg'>Đánh giá và nhận xét {title}</h2>
            <textarea
                  className='form-textarea w-full placeholder:italic placeholder:text-gray-500'
                  placeholder='Type something'
                  value={comment}
                  onChange={e => setComment(e.target.value)}
            ></textarea>
            <div className='w-full flex flex-col gap-4'>
              <p className='text-center'>How do you like this product?</p>
              <div className='flex justify-center gap-4 items-center'>
                {VoteOptions.map(el => (
                  <div 
                  className='w-[100px] bg-gray-100 rounded-md p-4 h-[100px] flex items-center justify-center flex-col gap-2 cursor-pointer' key={el.id}
                  onClick={() => setChoseScore(el.id)}
                  >
                    {(Number(ChoseScore) && ChoseScore >= el.id) ? <AiFillStar color='orange' /> : <AiFillStar color='gray' />}
                    <span>{el.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button handleOnclick={() => handleSubmitVoteOption({comment, score: ChoseScore})} fw>Submit</Button>
          </div>
      )
}

export default memo(VoteOption)