import React, {memo} from 'react'

const SelectQuantity = ({quantity, handleQuantity,handleChangeQuantity}) => {
  return (
    <div className='flex pt-3 pl-3'>
      <h2 className='font-semibold pt-1 pr-2'>Quantity: </h2>
      <span onClick={() =>handleChangeQuantity('minus')} className='text-[20px] pt-3 p-2 cursor-pointer border'>-</span>
      <input className='py-2 outline-none w-[70px] text-center border-gray-200' 
      type='text' 
      value={quantity}
      onChange={e => handleQuantity(e.target.value)}
      />
      <span onClick={() =>handleChangeQuantity('plus')} className='text-[20px] pt-3 p-2 cursor-pointer border'>+</span>
    </div>
  )
}

export default memo(SelectQuantity)