'use client'
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useSearchParams } from 'next/navigation'
import { useParams } from 'next/navigation';
import { resetPassword } from '@/app/actions/register';
import { useRouter } from 'next/navigation';


const ResetPassword = () => {
const [showPassword, setShowPassword] = useState(false);
const[showConfirmPassword, setShowConfirmPassword] = useState(false)
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');
const { userId } = useParams();
const router = useRouter();

const searchParams = useSearchParams();
const message = searchParams.get('message');

useEffect(() => {
    if (message) {
        toast.success(message);
    }
}, [message]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    if(password.trim()!== confirmPassword.trim()){
        toast.error('Passwords do nott match');
        return;
    }
    try{
        const res = await resetPassword(confirmPassword, userId, password);
        console.log(res);
        if(res.success){
            toast.success(res.message);
        }
        router.push('/login');

    }catch(err){
        toast.error(err.message || 'An error occurred while sending password reset email');
    }
  };
 
  return (
    <>
      <div className="container mx-auto h-auto">
        <div className="w-full max-w-md mx-auto bg-white shadow-md shadow-transparent rounded-lg border mt-14">
          <h1 className="text-center mt-3 font-bold text-3xl mb-5">Forgot Password</h1>
          <div>
            <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="password" className="block">
                  <span className=" block font-bold text-base ml-8 mb-2">Password</span>
                </label>
                <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=" focus:outline-blue-300 hover:outline-blue-300 block md:w-6/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-8 sm:w-10/12 lg:w-6/12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0  left-52 lg:left-56 md:left-56 flex items-center text-black"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
                </div>

                <div className="mb-4">
                <label htmlFor="password" className="block">
                  <span className=" block font-bold text-base ml-8 mb-2"> Confirm Password</span>
                </label>
                <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                  className=" focus:outline-blue-300 hover:outline-blue-300 block md:w-6/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-8 sm:w-10/12 lg:w-6/12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0  left-52 lg:left-56 md:left-56 flex items-center text-black"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
                </div>
              <div className='flex justify-center mt-10 mb-4'>
                 <button
                 type="submit"
                 disabled={!password || !confirmPassword}
                 className='bg-blue-600 text-white p-2 rounded-md block disabled:opacity-40'>
                   Reset Password
                 </button>
                </div>
                </form>
                <div className='flex ml-8 gap-7'>
                <div className='text-center mb-5'>
                  <Link href='/login'
                  className='text-blue-600 hover:underline'>
                     Back to login
                  </Link>
                </div>

                </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default ResetPassword