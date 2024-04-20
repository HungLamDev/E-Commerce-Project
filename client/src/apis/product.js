import axios from '../axios'

// call api product
export const apiGetProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})
export default apiGetProducts;