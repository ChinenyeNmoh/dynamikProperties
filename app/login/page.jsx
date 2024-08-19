'use client'
import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { signIn, useSession, getProviders } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [providers, setProviders] = useState(null);
const searchParams = useSearchParams();


const message = searchParams.get('message');
const error = searchParams.get('error');
 
  useEffect(() => {
    // If there's a message, display it
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

 
  useEffect(() => {
    const setAuthProviders = async() => {
      const res = await getProviders();
      console.log(res);
      setProviders(res);
    }
    setAuthProviders();

  }, []);
  return (
    <>
      <div className="container mx-auto h-auto">
        <div className="w-full max-w-md mx-auto bg-white shadow-md shadow-transparent rounded-lg border mt-14">
          <h1 className="text-center mt-3 font-bold text-3xl mb-5">Sign In</h1>
          <div>
            <form>
              <div className="mb-4">
                <label htmlFor="loginemail" className="block">
                  <span className="block font-bold text-base ml-8 mb-2">Email</span>
                </label>
                
                <input
                  type="text"
                  id="loginemail"
                  placeholder="Johndoe@email.com"
                  className=" focus:outline-blue-300 hover:outline-blue-300 block md:w-9/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-8 sm:w-10/12 lg:w-9/12"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block">
                  <span className=" block font-bold text-base ml-8 mb-2">Password</span>
                </label>
                <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
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
              <div className='flex justify-center mt-10 mb-4'>
                 <button className='bg-blue-600 text-white p-2 rounded-md block'>
                   Sign In
                 </button>
                </div>
                </form>
                <div className='mx-auto h-10 rounded-2xl block bg-neutral-200 w-6/12 mb-4'>
                {providers && Object.values(providers).map((provider, index) => (
                  <button
                  key={index}
                  onClick={() => signIn(provider.id)}
                  className='flex flex-row items-center cursor-pointer hover:bg-gray-100'
                  >
                  <Image 
                        src='/images/download.png'
                        className='p-2' 
                        alt='Google Logo' 
                        width={40} 
                        height={40}
                      />
                      <p className=''> Sign in with {provider.name}</p>
                  </button>

                ))} 
                  </div>
                <div className='flex ml-8 gap-7'>
                <div className='text-center mb-5 text-sm'>
                  No Account? <Link href='/register'
                  className='text-blue-600 hover:underline'>
                  
                  <span className='text-base'>Register</span>
                  </Link>
                </div>
                <div className='text-center mb-5 text-sm'>
                  <Link href='/forgotpassword'
                  className='text-blue-600 hover:underline italic mt-4 text-base'>
                  forgot password
                  </Link>
                </div>

                </div>
            
          </div>
        </div>
      </div>
    </>
  )
}

export default Login