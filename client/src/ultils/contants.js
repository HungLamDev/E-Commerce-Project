import path from "./path"
export const navigation =[
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.PRODUCTS}`
    },
    
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOGS}`
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQ',
        path: `/${path.FAQ}`
    },
]
export const colors = [
    'black',
    'white',
    'Yellow',
    'Gold',
    'Blue'

]
export const sorts = [
    {
        id: 1,
        value: '-sold',
        text: 'Best selling'
    },
    {
        id: 2,
        value: '-price',
        text: 'Price, High to Low'
    },
    {
        id: 3,
        value: 'price',
        text: 'Price, Low to High'
    },
    {
        id: 4,
        value: '-createdAt',
        text: 'New update'
    },
   

]