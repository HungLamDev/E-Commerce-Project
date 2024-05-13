import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import path from '../../ultils/path'
import Swal from 'sweetalert2'
const FinalRegister = () => {
    const navigate = useNavigate()
    const {status} = useParams()
    useEffect(() => {
        if (status === 'failed') {
            Swal.fire('Opp!', 'Hết hạn, Đăng ký không thành công', 'error').then(() => {
                navigate(`/${path.LOGIN}`)
            });
        }
        if (status === 'success') {
            Swal.fire('Congatution!!', 'Đăng ký thành công', 'success').then(() => {
                navigate(`/${path.LOGIN}`)
            });
        }
    }, [status]); 
  return (
    <div className='h-screen w-screen bg-gray-100'>

    </div>
  )
}

export default FinalRegister