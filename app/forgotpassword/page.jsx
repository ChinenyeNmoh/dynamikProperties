'use client'
import Link from 'next/link';
import { forgotPassword } from '../actions/register';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation'




const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const searchParams = useSearchParams();
const error = searchParams.get('error');
  
    useEffect(() => {
      
      if (error) {
        toast.error(error); 
      }
    }, []);
    

    const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await forgotPassword(email);
        console.log(res);
        toast.success(res.message);

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
                <label htmlFor="forgotPasswordemail" className="block">
                  <span className="block font-bold text-base ml-8 mb-2">Email</span>
                </label>
                
                <input
                  type="text"
                  id="forgotPasswordemail"
                  placeholder="Johndoe@email.com"
                  value={email}
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className=" focus:outline-blue-300 hover:outline-blue-300 block md:w-9/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-8 sm:w-10/12 lg:w-9/12"
                />
              </div>
              <div className='flex justify-center mt-10 mb-4'>
                 <button
                 type="submit"
                 disabled={!email}
                 className='bg-blue-600 text-white p-2 rounded-md block disabled:opacity-40'>
                   Send
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

export default ForgotPassword