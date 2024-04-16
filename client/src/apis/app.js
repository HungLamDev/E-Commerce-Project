import axios from '../axios';

// call api prodcategory
export const apiGetCategories = () => axios({
    url: '/prodcategory/',
    method: 'get'
})
export default apiGetCategories;