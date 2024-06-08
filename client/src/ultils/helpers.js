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
    for(let i = 0; i<+number;i++) star.push(<AiFillStar key={i} color='orange' />)
    for(let i = 5; i>+number;i--) star.push(<AiOutlineStar key={i} color='orange'/>)
    return star
}

// check giá trị có rỗng không
export const validate = ( payload, setInvalidField ) => {
    let invalids = 0
    //
    const formatPayload = Object.entries(payload)
    for (let array of formatPayload){
        if (array[1].trim() === ''){
            invalids++
            setInvalidField(prev => [...prev, {name: array[0], mes: 'Require this field'}])
        }
    }
    for (let array of formatPayload){
        switch (array[0]) {
            case 'email':
                const regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                if(!array[1].match(regex)){
                    invalids++
                    setInvalidField(prev => [...prev, {name: array[0], mes: 'Email Invalid a@gmail.com'}])
                }
                break;
                case 'password':
                if(array[1].length < 6){
                    invalids++
                    setInvalidField(prev => [...prev, {name: array[0], mes: 'Password minimum 6 charater'}])
                }
                break;
                case 'mobile':
                if(array[1].length <= 9 || array[1].length >= 11 ){
                    invalids++
                    setInvalidField(prev => [...prev, {name: array[0], mes: 'Mobile number must be 10 characters'}])
                }
                break;
        
            default:
                break;
        }
    }
    return invalids
}