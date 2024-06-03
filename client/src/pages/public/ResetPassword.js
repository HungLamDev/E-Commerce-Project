import React,{useState} from 'react'
import { Button } from '../../components'
import { useParams } from 'react-router-dom'
import { apiResetPassword } from '../../apis'
import { toast } from 'react-toastify'
const ResetPassword = () => {
  const [password, setpassword] = useState('')
  const {token} = useParams()
  const handleResetPassword = async () =>{
    console.log({ password, token });
    const response = await apiResetPassword({ password, token });
    console.log(response);
    if(response.success){
      toast.success(response.mes, {theme: 'colored'})
    }else toast.info(response.mes, {theme: 'colored'})
  }
  return (
    <div className='absolute animate-slide-right top-0 left-0 bottom-0 right-0 bg-white flex justify-center py-8 z-50 '>
      <div className='flex flex-col'>
          <label for='password' htmlFor='password' className='text-[18px]'>New Password:</label>
          <input 
          type='text'
          id='password'
          className='w-[800px] h-[50px] pb-2 border-b outline-none placeholder:text-[15px]'
          placeholder='Ex: abcd@'
          value={password}
          onChange={e=>setpassword(e.target.value)}
          />
          <div className='w-full flex justify-center pt-3 gap-4'>
              <Button 
                  name='submit'
                  handleOnclick={handleResetPassword}
                  style='px-4 py-2 rounded-md text-white bg-blue-500 my-2 text-semibold'
              />
          </div>
      </div>
  </div>
  )
}

export default ResetPassword