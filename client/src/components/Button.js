import React, { memo } from 'react';
const Button = ({name,children, handleOnclick, style, iconsBefore, iconsAfter,fw}) => {
  return (
    <button
      type='button'
      className={style ? style : `px-4 py-2 rounded-md text-white bg-orange-600 mt-2 text-semibold ${fw ? 'w-full' : 'w-fit'}`}
      onClick={() => {handleOnclick && handleOnclick()}}
    >
      <span>{children}</span>
      <span>{name}</span>
    </button>
  );
};

export default memo(Button)
