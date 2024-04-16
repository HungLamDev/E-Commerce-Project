import React, { useState, useEffect} from 'react'
import { apiGetCategories } from '../apis/app'
import { NavLink } from 'react-router-dom'
import {createSlug} from '../ultils/helpers'

const Sidebar = () =>{


    // call api vào sidebar
    const [categories , setCategories] = useState(null)
    const fetchCategories = async () =>{
        const response = await apiGetCategories()
        if(response.success) setCategories(response.prodCategories)
    }
    useEffect(() =>{
        fetchCategories()
    }, [])
    console.log(categories);
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
