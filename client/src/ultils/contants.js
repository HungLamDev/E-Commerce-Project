import icons from "./icons"
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
    'Blue',
    'Pink'

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
export const VoteOptions =[
    {
        "id": 1,
        "text": "Rất tệ"
    },
    {
        "id": 2,
        "text": "Tệ"
    },
    {
        "id": 3,
        "text": "Vừa"
    },
    {
        "id": 4,
        "text": "Tốt"
    },
    {
        "id": 5,
        "text": "Tuyệt"
    }
]
const { MdOutlineDashboardCustomize,FaRegUserCircle,AiOutlineProduct,RiBillLine} = icons
export const AdminSidebars = [
    {
        id: 1,
        type: 'SINGLE',
        text: "Dashboard",
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: <MdOutlineDashboardCustomize size={20}/>
    },
    {
        id: 2,
        type: 'SINGLE',
        text: "Manager User",
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: <FaRegUserCircle size={20}/>
    },
    {
        id: 3,
        type: 'PARENT',
        text: "Products Management", // Changed to ensure uniqueness
        icon: <AiOutlineProduct size={20}/>,
        submenu: [
            {
                text: 'Create Product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`,
            },
            {
                text: 'Manage Products', // Changed to ensure uniqueness
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`,
            },
        ]
    },
    {
        id: 4,
        type: 'SINGLE',
        text: "Manager Orders",
        path: `/${path.ADMIN}/${path.MANAGE_ORDER}`,
        icon: <RiBillLine size={20}/>
    },
];
export const roles = [
    {
      code: 1945,
      value: 'Admin'
    },
    {
      code: 1979,
      value: 'User'
    },
    
  ];
