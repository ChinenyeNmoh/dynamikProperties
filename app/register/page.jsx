'use client'
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ReCAPTCHA from "react-google-recaptcha";
import Link from 'next/link';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import {registerUser} from '../actions/register';


const Register = () => {

  const clientCaptcha = process.env.NEXT_PUBLIC_CLIENT_CAPTCHA;
  const [showPassword, setShowPassword] = useState(false);
  const[showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [captchaValue, setCaptchaValue] = useState(null);
  const recaptchaRef = useRef(null);
  const [fullName, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobile, setMobile] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCaptcha = (value) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await registerUser({
            fullName,
            email,
            password,
            confirmPassword,
            mobile,
            captcha: captchaValue
        });
        
        if (response.success) {
            toast.success(response.message);
        }
    } catch (error) {
        toast.error(error.message || 'An error occurred during registration');
    }
};

  return (
    <>
      <div className="container mx-auto h-auto">
        <div className="w-full max-w-xl mx-auto bg-gray-900 text-white shadow-md shadow-transparent rounded-lg border mt-14">
          <h1 className="text-center mt-3 font-bold text-3xl mb-5">Sign Up</h1>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullname" className="block">
                  <span className="block font-bold text-base ml-4 mb-2">Full Name</span>
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="John Doe"
                  required={true}
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                  className="focus:outline-blue-300 hover:outline-blue-300 block md:w-11/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-4 sm:w-10/12 lg:w-11/12"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block">
                    <span className="block font-bold text-base ml-4 mb-2">Email</span>
                  </label>
                  <input
                    type="text"
                    id="email1"
                    placeholder="Johndoe@email.com"
                    value={email}
                    required={true}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:outline-blue-300 hover:outline-blue-300 block sm:w-10/12 lg:w-11/12 md:w-11/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-4"
                  />
                </div>

                <div>
                  <label htmlFor="mobile" className="block">
                    <span className="block font-bold text-base ml-4 mb-2">Phone Number</span>
                  </label>
                  <PhoneInput
                    country={'ng'}
                    placeholder='09090000000'
                    value={mobile}
                    buttonClass='ml-4'
                    onChange={(phone) => setMobile(phone)}
                    inputProps={{
                      required: true,
                     className: "focus:outline-blue-300 hover:outline-blue-300 block sm:w-9/12 lg:w-9/12 md:w-9/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-12"
                    }}
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block">
                    <span className="block font-bold text-base ml-4 mb-2">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      value={password}
                      required={true}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:outline-blue-300 hover:outline-blue-300 block sm:w-10/12 lg:w-11/12 md:w-11/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-4"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 left-48 lg:left-60 md:left-60 flex items-center text-white /></div>"
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block">
                    <span className="block font-bold text-base ml-4 mb-2">Confirm Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      value={confirmPassword}
                      required={true}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="focus:outline-blue-300 hover:outline-blue-300 block sm:w-10/12 lg:w-10/12 md:w-11/12 px-3 py-2 h-10 rounded-md bg-inherit border ml-4"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                     className="absolute inset-y-0 left-48 lg:left-56 md:left-56 flex items-center text-white"
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                <ReCAPTCHA
                  sitekey={clientCaptcha}
                  onChange={handleCaptcha}
                  ref={recaptchaRef}
                  className='ml-4 w-6/12'
                />
              </div>

              <div className='flex justify-center mt-10 mb-4'>
                <button className='bg-blue-600 text-white p-2 rounded-md block'>
                  Register
                </button>
              </div>
              <div className='text-center mb-5 text-sm'>
                Already have an account? <Link href='/login' className='text-blue-600 hover:underline'>
                  <span className='text-base'>Login</span>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register;
