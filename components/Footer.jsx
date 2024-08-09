'use client';
import Image from 'next/image';
import { IoMdMail } from "react-icons/io";
import { FaLocationDot, FaXTwitter } from "react-icons/fa6";
import { FaUser, FaPhone, FaFacebook } from "react-icons/fa";
import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineMessage } from "react-icons/ai";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [mobile, setMobile] = useState('');

  return (
    <footer className='bg-slate-900 py-4 mt-24'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        <div className='h-auto rounded-md'>
          <div className='flex flex-row justify-center'>
            <Image
              src="/images/logo-white.png"
              className='h-10 w-auto mt-5 mr-3'
              alt="Logo"
              width={40}
              height={40}
            />
            <h3 className="text-center mt-4 mb-4 pt-3 text-sky-200 font-extrabold text-xl">
              About Us
            </h3>
          </div>
          <p className="italic p-3 text-sky-100">
            DynamikProperties specialize in offering a diverse range of properties that cater to every lifestyle and budget. Whether you're looking for a cozy apartment, a luxurious villa, or a family-friendly house, DynamikProperties has the ideal match for you. Our commitment to excellence, attention to detail, and customer-centric approach ensure a seamless and rewarding real estate experience.
            <br />
            <br />
            Join us in making your real estate dreams a reality. Explore, envision, and embrace your new home with DynamikProperties today!
          </p>
        </div>
        <div className='h-auto rounded-md ml-4'>
          <h3 className="text-center mt-4 mb-6 pt-3 text-sky-200 font-extrabold text-2xl">
            Quick Links
          </h3>
          <p className='text-sky-100 flex mb-4'>
            <FaLocationDot className="text-red-600 me-2 text-xl" />
            Plot 25, Lekki Phase 1, Lagos, Nigeria.
          </p>
          <p className='text-sky-100 flex mb-4'>
            <FaPhone className="text-white me-2 text-xl" />
            +2347090567890, +2347047893564
          </p>
          <p className='text-sky-100 flex mb-4'>
            <IoMdMail className="text-white me-2 text-xl" />
            info@dynamikshop.com
          </p>
          <h3 className="mb-6 text-center text-sky-300 font-extrabold">
            Follow Us
          </h3>
          <div className="flex gap-6">
            <Link href="#">
              <FaFacebook className="text-blue-500 text-2xl" />
            </Link>
            <Link href="#">
              <Image src='/images/instagram.png' width={30} height={30} alt="Instagram" />
            </Link>
            <Link href="#">
              <FaXTwitter className="text-white text-2xl" />
            </Link>
          </div>
        </div>
        <div className='h-auto rounded-md ml-4'>
          <h3 className="text-center mt-4 mb-6 pt-3 text-sky-200 font-extrabold text-2xl">
            Send a Message
          </h3>
          <form onSubmit='' className='italic'>
            <div className='flex mb-3 relative'>
              <input
                type="text"
                id="name"
                placeholder="John Doe"
                value={name}
                className="pl-14 w-72 h-8 rounded-md text-black bg-sky-50"
                onChange={(e) => setName(e.target.value)}
              />
              <label
                htmlFor="phone"
                className="absolute text-sky-900 p-2 h-full text-xl rounded-l-md"
              >
                <FaUser />
              </label>
            </div>

            <div className='flex mb-3 relative'>
              <input
                type="number"
                id="phone"
                placeholder="09090000000"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="pl-14 w-72 h-8 rounded-md text-black bg-sky-50"
              />
              <label
                htmlFor="phone"
                className="absolute text-sky-900 p-2 h-full text-xl rounded-l-md"
              >
                <FaPhone />
              </label>
            </div>

            <div className="flex mb-3 relative">
              <input
                type="email"
                id="email"
                className="pl-10 w-72 h-8 rounded-md text-black bg-sky-50"
                placeholder="johndoe@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor='email' className="absolute text-sky-900 p-2 h-full text-xl rounded-l-md">
                <IoMdMail />
              </label>
            </div>

            <div className="mb-3 flex relative">
              <textarea
                id="message"
                placeholder="Enter your message here"
                className="pl-10 w-72 h-8 rounded-md text-black bg-sky-50"
                value={message}
                rows={5}
                onChange={(e) => setMessage(e.target.value)}
              />
              <label htmlFor='message' className="absolute text-sky-900 p-2 h-full text-xl rounded-l-md">
                <AiOutlineMessage />
              </label>
            </div>

            <button
              type="submit"
              className="bg-blue-600 block ml-20 text-white w-24 h-8 rounded-md"
            >
              Send
            </button>
          </form>
        </div>
      </div>
      <p className="text-sky-100 mt-5 text-center font-bold">
        dynamikProperties &copy; {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
