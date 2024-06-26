import React from 'react'

const InputSelect = ({ value, changeValue, options }) => {
  return (
    <select className='form-select' value={value} onChange={e => changeValue(e.target.value)}>
      <option value="">Chosse</option>
      {options?.map(el => (
        <option  key={el.id} value={el.value}>{el.text}</option>
      ))}
    </select>
  )
}

export default InputSelect
