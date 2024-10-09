'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';

const PropertySearchForm = () => {
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedLocation = location.trim();
    if (trimmedLocation) { 
      const query = `?location=${encodeURIComponent(trimmedLocation)}`;
      router.push(`/properties${query}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e); 
    }
  };

  return (
    <form onSubmit={handleSubmit} className=' mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-center'>
      <div className='w-full md:w-3/5 md:pr-2 mb-4 md:mb-0 relative'>
        <label htmlFor='location' className='sr-only'>
          Location
        </label>
        <input
          type='text'
          id='location'
          placeholder='Enter Keywords or Location'
          className='w-full px-4 py-3  rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500 border border-solid border-blue-500'
          value={location}
          onChange={(e) => setLocation(e.target.value)} // Update the state correctly
          onKeyDown={handleKeyDown} // Add the onKeyDown handler
        />
        {location && (
          <button
            type='button'
            className='absolute right-3 top-4'
            onClick={() => {
              setLocation(''); // Clear the input field
              router.push(`/properties`); // Redirect to the properties page without query
            }}
          >
            <FaTimes className='text-black hover:text-black' size={20} />
          </button>
        )}
      </div>
      <button
        type='submit'
        className='mt-2 md:mt-0 md:ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700'
      >
        Search
      </button>
    </form>
  );
};

export default PropertySearchForm;
