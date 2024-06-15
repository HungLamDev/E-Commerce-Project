import React, { memo, Fragment, useState } from 'react';
import logo from 'assets/a.jpg';
import { AdminSidebars } from 'ultils/contants';
import { NavLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import path from 'ultils/path';
import { AiOutlineCaretDown, AiOutlineCaretRight } from 'react-icons/ai';

const AdminSidebar = () => {
    const baseStyle = 'px-4 py-2 flex items-center gap-2';
    const activeStyle = 'bg-gray-300 text-gray-600';
    const hoverStyle = 'hover:bg-gray-300 text-gray-600';
    const [active, setActive] = useState([]);
    
    const handleShowTab = (tabID) => {
        if (active.some(el => el === tabID)) {
            setActive(prev => prev.filter(el => el !== tabID));
        } else {
            setActive(prev => [...prev, tabID]);
        }
    };

    return (
        <div className='bg-white h-full py-4'>
            <Link 
                className='flex flex-col justify-center items-center gap-2 p-4'
                to={`/${path.ADMIN}`}
            >
                <img src={logo} alt="logo" className='w-[200px] object-contain' />
                <h2 className='font-main text-sm'>Admin Workspace</h2>
            </Link>
            <div>
                {AdminSidebars.map((el) => (
                    <Fragment key={el.id}>
                        {el.type === 'SINGLE' && (
                            <NavLink 
                                to={el.path}
                                className={({ isActive }) => clsx(baseStyle, hoverStyle, isActive && activeStyle)}
                            >
                                <span>{el.icon}</span>
                                <span>{el.text}</span>
                            </NavLink>
                        )}
                        {el.type === 'PARENT' && (
                            <div onClick={() => handleShowTab(el.id)} className='flex flex-col gap-2 text-gray-600'>
                                <div className={clsx(baseStyle, hoverStyle, 'justify-between cursor-pointer')}>
                                    <div className='flex gap-2 items-center text-gray-600 '>
                                        <span>{el.icon}</span>
                                        <span>{el.text}</span>
                                    </div>
                                    {active.some(id => id === +el.id) ? <AiOutlineCaretDown /> : <AiOutlineCaretRight />}
                                </div>
                                {active.some(id => id === +el.id) && (
                                    <div className='flex flex-col gap-2'>
                                        {el.submenu.map((item) => (
                                            <NavLink 
                                                key={`${item.text}`} 
                                                to={item.path}
                                                onClick={(e) => e.stopPropagation()}
                                                className={({ isActive }) => clsx(baseStyle, hoverStyle, 'pl-8', isActive && activeStyle)}
                                            >
                                                {item.text}
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>
        </div>
    );
};

export default memo(AdminSidebar);
