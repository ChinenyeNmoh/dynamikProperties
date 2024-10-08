'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

const PropertySearchForm = () => {
  const [location, setLocation] = useState('');
  const router = useRouter();
  console.log('location',location);

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    const query = `?location=${location}`; // Encode URI component to handle special characters
    console.log('query',query);
    router.push(`/properties${query}`);
  };

  return (
    <form
    >
      <div className='w-10/12 md:w-3/5 md:pr-2 pr-0 mb-4 md:mb-0 relative  block mx-auto mt-4 rounded-lg '>
        <label htmlFor='location' className='sr-only'>
          Location
        </label>
        <input
          type='text'
          id='location'
          placeholder='Enter Keywords or Location'
          className='w-full px-4 py-3 m-0  rounded-lg text-gray-800 border-2 border-solid border-gray-800 focus:outline-none focus:ring focus:ring-gray-900'
          value={location}
          onChange={(e) => {
            setLocation(e.target.value)
            handleSubmit(e); 
          }} 
        />
        {location && (
          <button
            type='button'
            className='absolute right-2 top-5'
            onClick={() => {
              setLocation(''); // Clear the input field
              router.push(`/properties`); // Redirect to the properties page without query
            }}
          >
            <FaTimes className='text-black hover:text-black' size={15} />
          </button>
        )}
      </div>
      
    </form>
  );
};

export default PropertySearchForm;
