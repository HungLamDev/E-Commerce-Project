import React from 'react';

// Tạo một component InputField nhận các props như value, setValue, nameKey, type, invalidFields, setInvalidField
const InputField = ({ value, setValue, nameKey, type, invalidFields, setInvalidField }) => {
    return (
        <div className='w-full'>
            {/* Nhãn cho trường nhập liệu */}
            <label htmlFor={nameKey}>{nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} </label>

            {/* Trường nhập liệu */}
            <input 
                type={type || 'text'} // Loại của trường nhập liệu, mặc định là text nếu không có loại nào được cung cấp
                className='px-4 py-2 rounded-sm border w-full my-2 placeholder:text-sm placeholder:italic outline-none' // Các lớp CSS để tạo kiểu cho trường nhập liệu
                placeholder={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} // Văn bản xuất hiện trong trường nhập liệu khi không có giá trị
                value={value} // Giá trị của trường nhập liệu
                onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))} // Xử lý sự kiện khi giá trị của trường nhập liệu thay đổi
            />
        </div>
    );
}

export default InputField;
