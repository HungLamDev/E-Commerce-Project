import React, { memo } from 'react';

// Tạo một component InputField nhận các props như value, setValue, nameKey, type, invalidFields, setInvalidField
const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidField }) => {
    return (
        <div className='w-full relative flex flex-col gap-1 mb-2'>
            <label htmlFor={nameKey} for = {nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}>{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} </label>

            <input 
                type={type || 'text'} // Loại của trường nhập liệu, mặc định là text nếu không có loại nào được cung cấp
                className='px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none' // Các lớp CSS để tạo kiểu cho trường nhập liệu
                placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} // Văn bản xuất hiện trong trường nhập liệu khi không có giá trị
                value={value} // Giá trị của trường nhập liệu
                id={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
                onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))} // Xử lý sự kiện khi giá trị của trường nhập liệu thay đổi
                onFocus={() => setInvalidField([])}
            />

            {invalidFields?.some(el => el.name == nameKey) && 
            <small className='text-main text-[14px] italic'>{invalidFields.find(el => el.name == nameKey)?.mes}</small>}
        </div>
    );
}  

export default memo(InputField);
