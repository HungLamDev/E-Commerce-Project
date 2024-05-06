import React, { useCallback } from 'react';
import { InputField, Button } from '../../components';
import { useState } from 'react';
import { apiRegister, apiLogin } from '../../apis';
import Swal from 'sweetalert2';
import {useNavigate} from 'react-router-dom'
import path from '../../ultils/path';
import {register} from '../../store/user/userSlice'
import { useDispatch } from 'react-redux';


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [payload, setPayload] = useState({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        mobile: '' 
    });

    const [isRegister, setIsRegister] = useState(false);
    const resetPayload = () =>{
        setPayload({
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            mobile: ''
        })
    }
    const handlesubmit = useCallback(async () => {
        const { firstname, lastname, mobile, ...data } = payload;
        if (isRegister) {
            const response = await apiRegister(payload);
            console.log(response);
            if(response.success){
                // hiển thị thông báo 
                Swal.fire('Congratulation!',response.mes,'success!')
                .then(() => { 
                    setIsRegister(false)
                    resetPayload()
                })
            }else{
                Swal.fire('Oops!',response.mes,'error!')
            }
        } else {
            const rs = await apiLogin(data);
            if(rs.success){
                dispatch(register({isLoggedIn: true, token: rs.accessToken, userData: rs.userData}))
                navigate(`/${path.HOME}`)
            }else{
                Swal.fire('Oosp!',rs.mes,'error!')
            }
        }
    }, [payload, isRegister,navigate]);

    return (
        <div className='w-screen h-screen relative'>
            <img
                src='https://img.freepik.com/premium-photo/shopping-cart-card-icon-discounts_116441-26066.jpg'
                alt=''
                className='w-full h-full object-cover'
            />
            <div className='absolute top-0 bottom-0 left-0 right-1/2 items-center justify-center flex'>
                <div className='p-8 bg-white rounded-md min-w-[500px] flex flex-col items-center'>
                    <h1 className='text-[30px] font-semibold text-main mb-8'>{isRegister ? 'REGISTER' : 'LOGIN'}</h1>
                    {isRegister && (
                        <div className='flex items-center gap-2'>
                            <InputField value={payload.firstname} setValue={setPayload} nameKey={'firstname'} />
                            <InputField value={payload.lastname} setValue={setPayload} nameKey={'lastname'} />
                        </div>
                    )}
                    <InputField 
                        value={payload.email} 
                        setValue={setPayload} 
                        nameKey={'email'} />
                    {isRegister && (
                        <InputField 
                        value={payload.mobile} 
                        setValue={setPayload} 
                        nameKey={'mobile'} />
                    )}
                    <InputField 
                        value={payload.password} 
                        setValue={setPayload} 
                        nameKey={'password'} 
                        type='password' />
                    <Button 
                    name={isRegister ? 'Register' : 'Login'}
                    handleOnclick={handlesubmit} 
                    fw />
                    <div className='flex  items-center justify-between pt-5 w-full text-[16px]'>
                        {!isRegister && (
                            <span className='text-blue-600 hover:text-red-400 cursor-pointer'>Forgot your password?</span>
                        )}
                        {!isRegister && (
                            <span className='text-blue-600 hover:text-red-400 cursor-pointer' onClick={() => setIsRegister(true)}>
                                Create Account
                            </span>
                        )}
                        {isRegister && (
                            <span className='text-blue-600 hover:text-red-400 cursor-pointer w-full text-center' onClick={() => setIsRegister(false)}>
                                Go Login
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
