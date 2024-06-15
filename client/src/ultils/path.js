const path = {
    PUBLIC: '/',
    HOME: '',
    ALL: '*', 
    LOGIN: 'Login',
    PRODUCTS: ':category',
    BLOGS: 'blogs',
    OUR_SERVICES: 'services',
    FAQ: 'faq', 
    DETAIL_PRODUCT__CATEGORY__PID__TITLE: ':category/:pid/:title',
    FINALREGISTER: 'finalregister/:status',
    RESET_PASSWORD: 'reset-password/:token',

    // Admin
    ADMIN: "admin",
    DASHBOARD: "dashboard",
    MANAGE_USER: "manage-user",
    MANAGE_PRODUCTS: "manage_products",
    MANAGE_ORDER: "manage_order",
    CREATE_PRODUCTS: "create_products",
  
    // Member
    MEMBER: "member",
    PERSONAL: "personal",
}

export default path