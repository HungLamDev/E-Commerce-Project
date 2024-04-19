import React, {useEffect, useState} from 'react'
import {apiGetProducts} from '../apis/product'
import {Product} from './'
import Slider from "react-slick";


const tabs = [
    {id: 1, name: 'best seller'},
    {id: 2, name: 'new nerivas'},
]
// react slick
const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1
  };

const BestSeller = () =>{
    const [ bestSellers , setBestSeller ] = useState(null)
    const [ NewProducts , setNewProducts ] = useState(null)
    const [ activedTab , setActivedTab  ] = useState(1)

    const ferchProducts = async () => {
        // số lượng giảm giần sao đó lấy lượt bán cao nhất 
        const response = await Promise.all([apiGetProducts({sort: '-sold'}), apiGetProducts({sort: '-createdAt'})])
        if ( response[0]?.success) setBestSeller(response[0].Products)
        if ( response[1]?.success) setNewProducts(response[1].Products)
    }

    useEffect(() => {
        ferchProducts()
    }, [])
    return (
        <div>
            <div className='flex text-[20px] gap-8 pb-4 border-b-2 border-main'>
                {tabs.map(el => (
                    <span
                    key={el.id} 
                    className={`font-semibold capitalize cursor-pointer boder-r text-gray-400 ${activedTab == el.id ? 'text-gray-900' : ''}`}
                    onClick={() => setActivedTab(el.id)}
                    >{el.name}</span>
                ))}
            </div>
            <div className='mt-4 mx-[-10px]'>
                <Slider {...settings}>
                    {bestSellers?.map(el => (
                        <Product 
                            key ={el.id}
                            productData = {el}
                        />
                    ))}
                </Slider> 
            </div>
        </div>
    )
    
}
export default BestSeller