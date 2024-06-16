import React, { memo } from 'react';
import clsx from 'clsx';

const InputManage = ({ value, setValue, nameKey, type, invalidFields, setInvalidField, style, fullwidth, placeholder, isHideLabel}) => {
    return (
        <div className={clsx('relative flex flex-col gap-1 mb-2', fullwidth && 'w-full')}>
            {!isHideLabel && value?.trim() !== '' && <label className='animate-slide-top-sm text-[10px] absolute top-0 left-[12px] block bg-white px-1' htmlFor={nameKey}>{nameKey?.slice(0, 1).toUpperCase() + nameKey?.slice(1)}</label>}
            <input 
                type={type || 'text'} 
                className={clsx('px-4 py-2 rounded-sm border w-full mt-2 placeholder:text-sm placeholder:italic outline-none', style)} 
                placeholder={placeholder || nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)} 
                value={value} 
                id={nameKey?.slice(0,1).toUpperCase() + nameKey?.slice(1)}
                onChange={e => setValue(prev => ({...prev, [nameKey]: e.target.value}))} 
                onFocus={() => setInvalidField && setInvalidField([])}
            />
            {invalidFields?.some(el => el.name == nameKey) && 
            <small className='text-main text-[14px] italic'>{invalidFields.find(el => el.name == nameKey)?.mes}</small>}
        </div>
    );
}  

export default memo(InputManage);
