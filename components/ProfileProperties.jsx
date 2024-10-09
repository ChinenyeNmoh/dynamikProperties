'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { deleteProperty } from  "@/app/actions/properties";
import Swal from 'sweetalert2';
import LoadingPage from '@/app/loading';

const ProfileProperties = ({ properties: initialProperties }) => {
  const [properties, setProperties] = useState(initialProperties);
  const [loading, setLoading] = useState(false);

  // Define the delete handler with the property ID
  const handleDeleteProperty = async (propertyId) => {
    try {
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this property',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      });

      if (result.isConfirmed) {
        // Call the delete action with the correct property ID
        setLoading(true);
        const data = await deleteProperty(propertyId); 
        toast.success(data.message);

        // Remove the deleted property from the local state
        setProperties(properties.filter((p) => p._id !== propertyId));
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete property', error.message);
      setLoading(false);
    }
  };

  return properties.map((property) => (
    <div key={property._id} className='mb-10'>
      <Link href={`/properties/${property._id}`}>
        <Image
          className='h-32 w-full rounded-md object-cover'
          src={property.images[0]}
          alt='Property Image'
          width={500}
          height={100}
          priority={true}
        />
      </Link>
      <div className='mt-2'>
        <p className='text-lg font-semibold'>{property.name}</p>
        <p className='text-gray-600'>
          Address: {property.location.street}, {property.location.city},{' '}
          {property.location.state}
        </p>
      </div>
      {loading && <LoadingPage />}
      <div className='mt-2'>
        <Link
          href={`/properties/${property._id}/edit`}
          className='bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600'
        >
          Edit
        </Link>
        <button
          onClick={() => handleDeleteProperty(property._id)} // Pass the correct property ID
          className='bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600'
          type='button'
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default ProfileProperties;
