import React from 'react'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../ultils/helpers'
import { useSelector } from 'react-redux'

const Sidebar = () =>{
    // call api vào sidebar
    const {categories} = useSelector(state => state.app)
    // viết html
    return (
        <div className='flex flex-col'>
            {categories?.map( el => (
                <NavLink 
                    key={createSlug(el.title)}
                    to ={createSlug(el.title)}
                    className ={({isActive}) =>isActive 
                    ? 'bg-orange-500 text-white px-5 pt-[15px] pb-[14px] text-sm hover:text-main'
                    :'px-5 pt-[15px] pb-[14px] text-sm hover:text-main'}
                >
                    {el.title}
                </NavLink>
            ))}
        </div>
    )
}
export default Sidebar
