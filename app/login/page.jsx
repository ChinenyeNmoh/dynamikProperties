'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useEffect } from 'react';
import { signIn, getProviders } from 'next-auth/react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import LoadingPage from '../loading';
import { useSession } from 'next-auth/react';
import { FaArrowLeft } from 'react-icons/fa';
import { loginUser } from '../actions/register';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [providers, setProviders] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  

  const message = searchParams.get('message');
  const error = searchParams.get('error');

  useEffect(() => {
    if (message) {
      toast.success(message);
    }
    if (error) {
      toast.error(error);
    }
  }, [message, error]);

  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);

  // Sign in user
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('userInfo', JSON.stringify(res?.user));
      toast.success('Logged in successfully');
      setLoading(false);
      // Redirect to dashboard if successful
     window.location.href = '/';
    } catch (err) {
      toast.error(err.message || 'An error occurred while logging in');
      setLoading(false);
    }
  };

  const { data } = useSession();

  // Only save user to localStorage in the browser
  useEffect(() => {
   const setLocalUser = async () => {
    if (data) {
     await localStorage.setItem('userInfo', JSON.stringify(data.user));
     router.push('/');
    }
   };
    setLocalUser();
  }, [data, router]);


  return (
    <>
      <div className="container mx-auto h-auto">
        <Link
          href='/'
          className='bg-gray-900 hover:text-blue-600 flex items-center border-2 rounded-md border-gray-900 w-24 mt-14 text-white'
        >
          <FaArrowLeft className='mr-2 ml-2 my-3 text-white' /> Home
        </Link>

        <div className="w-full max-w-md mx-auto bg-gray-900 text-white shadow-md shadow-transparent rounded-lg border mt-14">
          <h1 className="text-center mt-3 font-bold text-3xl mb-5">Sign In</h1>
          {loading && <LoadingPage />}
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
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="focus:outline-blue-300 hover:outline-blue-300 block w-11/12 px-3 py-2 h-10 rounded-md bg-inherit border mx-auto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block">
                  <span className="block font-bold text-base ml-8 mb-2">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="focus:outline-blue-300 hover:outline-blue-300 block w-11/12 px-3 py-2 h-10 rounded-md bg-inherit border mx-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-6 flex items-center text-black"
                  >
                    {showPassword ? <FaEyeSlash className='text-white' /> : <FaEye className='text-white' />}
                  </button>
                </div>
              </div>
              <div className='flex justify-center mt-10 mb-4'>
                <button
                  className='bg-blue-100 cursor-pointer disabled:cursor-not-allowed hover:bg-blue-300 text-black font-bold px-4 py-2 rounded-md block'
                  onClick={submitHandler}
                  disabled={!email || !password}
                >
                  Sign In
                </button>
              </div>
            </form>
            <div className='mx-auto h-10 rounded-2xl block bg-neutral-200 text-black font-bold w-6/12 mb-4'>
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
            <div className='flex justify-between mx-8 gap-7 mb-4'>
              <div className='text-sm'>
                No Account? <Link href='/register' className='text-blue-600 hover:underline'>
                  <span className='text-base'>Register</span>
                </Link>
              </div>
              <div className='text-sm'>
                <Link href='/forgotpassword' className='text-blue-600 hover:underline italic mt-4 text-base'>
                  Forgot Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
