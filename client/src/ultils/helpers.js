import icons from './icons'

const {AiFillStar,AiOutlineStar} = icons
//một phiên bản chuỗi gọn gàng, không chứa các ký tự đặc biệt hoặc khoảng trắng, thay vào đó thường là các ký tự ASCII và dấu gạch ngang (-) để tách các từ
export const createSlug = string => string.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-')
// tách price thành 1000 - 1,000
export const formatMoney = number => Number(number?.toFixed(1)).toLocaleString()
// 
export const renderStarFromNunber = (number) => {
    if(!Number(number)) return
    const star = []
    for(let i = 0; i<+number;i++) star.push(<AiFillStar color='orange' />)
    for(let i = 5; i>+number;i--) star.push(<AiOutlineStar color='orange'/>)
    return star
}