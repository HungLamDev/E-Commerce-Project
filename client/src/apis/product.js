import axios from '../axios'

// call api product
export const apiGetProducts = (params) => axios({
    url: '/product/',
    method: 'get',
    params
})
export const apiGetproduct = (pid) => axios({
    url: '/product/' + pid,
    method: 'get',
})
