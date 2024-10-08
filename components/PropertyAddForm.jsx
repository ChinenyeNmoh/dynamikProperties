'use client';
import { addProperty } from "@/app/actions/properties";
import { toast } from "react-toastify";
import LoadingPage from "@/app/loading";
import { useState } from "react";

const PropertyAddForm = ({ types, categories }) => {
  const [loading, setLoading] = useState(false);
  

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const formData = new FormData(e.target);
    formData.append
    try {
      setLoading(true);
      const res = await addProperty(formData);
      toast.success(res.message);
    } catch (error) {
      console.log('Error adding property:', error);
      toast.error('Error adding property: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} >
      {loading && <LoadingPage />}
      <h2 className='text-3xl text-center font-semibold mb-6'>Add Property</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      <div className='mb-4'>
        <label htmlFor='type' className='block text-gray-700 font-bold mb-2'>
          Property Type
        </label>
        <select
          id='type'
          name='type'
          className='border rounded w-full py-2 px-3'
          required
        >
            <option value=''>Select a type</option>
         {types?.map((type) => (
            <option key={type._id} value={type._id}>{type.name}</option>

         ))}
         </select>
      </div>
      <div className='mb-4'>
        <label htmlFor='category' className='block text-gray-700 font-bold mb-2'>
          Property Category
        </label>
        <select
          id='category'
          name='category'
          className='border rounded w-full py-2 px-3'
          required
        >
            <option value=''>Select a category</option>
         {categories?.map((cat) => (
            <option key={cat._id} value={cat._id}>{cat.name}</option>

         ))}
         </select>
      </div>
      </div>
      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Listing Name
        </label>
        <input
          type='text'
          id='name'
          name='name'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='eg. Beautiful Apartment In Miami'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='description'
          className='block text-gray-700 font-bold mb-2'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          className='border rounded w-full py-2 px-3'
          rows='4'
          placeholder='Add an optional description of your property'
        ></textarea>
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>Location</label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        <input
          type='text'
          id='street'
          name='location.street'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Street'
        />
        <input
          type='text'
          id='city'
          name='location.city'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='City'
          required
        />
        <input
          type='text'
          id='state'
          name='location.state'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='State'
          required
        />
        <input
          type='text'
          id='zipcode'
          name='location.zipcode'
          className='border rounded w-full py-2 px-3 mb-2'
          placeholder='Zipcode'
        />
      </div>
      </div>

      <div className='mb-4 flex flex-wrap'>
        <div className='w-full sm:w-1/3 pr-2'>
          <label htmlFor='beds' className='block text-gray-700 font-bold mb-2'>
            Beds
          </label>
          <input
            type='number'
            id='beds'
            name='beds'
            className='border rounded w-full py-2 px-3'
            required
          />
        </div>
        <div className='w-full sm:w-1/3 px-2'>
          <label htmlFor='baths' className='block text-gray-700 font-bold mb-2'>
            Baths
          </label>
          <input
            type='number'
            id='baths'
            name='baths'
            className='border rounded w-full py-2 px-3'
            required
          />
        </div>
        <div className='w-full sm:w-1/3 pl-2'>
          <label
            htmlFor='square_feet'
            className='block text-gray-700 font-bold mb-2'
          >
            Square Feet
          </label>
          <input
            type='number'
            id='square_feet'
            name='square_feet'
            className='border rounded w-full py-2 px-3'
            required
          />
        </div>
      </div>

      <div className='mb-4'>
        <label className='block text-gray-700 font-bold mb-2'>Amenities</label>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
          <div>
            <input
              type='checkbox'
              id='amenity_wifi'
              name='amenities'
              value='Wifi'
              className='mr-2'
            />
            <label htmlFor='amenity_wifi'>Wifi</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_kitchen'
              name='amenities'
              value='Full kitchen'
              className='mr-2'
            />
            <label htmlFor='amenity_kitchen'>Full kitchen</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_washer_dryer'
              name='amenities'
              value='Washer & Dryer'
              className='mr-2'
            />
            <label htmlFor='amenity_washer_dryer'>Washer & Dryer</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_free_parking'
              name='amenities'
              value='Free Parking'
              className='mr-2'
            />
            <label htmlFor='amenity_free_parking'>Free Parking</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_pool'
              name='amenities'
              value='Swimming Pool'
              className='mr-2'
            />
            <label htmlFor='amenity_pool'>Swimming Pool</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_hot_tub'
              name='amenities'
              value='Hot Tub'
              className='mr-2'
            />
            <label htmlFor='amenity_hot_tub'>Hot Tub</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_24_7_security'
              name='amenities'
              value='24/7 Security'
              className='mr-2'
            />
            <label htmlFor='amenity_24_7_security'>24/7 Security</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_wheelchair_accessible'
              name='amenities'
              value='Wheelchair Accessible'
              className='mr-2'
            />
            <label htmlFor='amenity_wheelchair_accessible'>
              Wheelchair Accessible
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_elevator_access'
              name='amenities'
              value='Elevator Access'
              className='mr-2'
            />
            <label htmlFor='amenity_elevator_access'>Elevator Access</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_dishwasher'
              name='amenities'
              value='Dishwasher'
              className='mr-2'
            />
            <label htmlFor='amenity_dishwasher'>Dishwasher</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_gym_fitness_center'
              name='amenities'
              value='Gym/Fitness Center'
              className='mr-2'
            />
            <label htmlFor='amenity_gym_fitness_center'>
              Gym/Fitness Center
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_luxury'
              name='is_luxury'
              className='mr-2'
            />
            <label htmlFor='amenity_luxury'>Luxury</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_balcony_patio'
              name='amenities'
              value='Balcony/Patio'
              className='mr-2'
            />
            <label htmlFor='amenity_balcony_patio'>Balcony/Patio</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_smart_tv'
              name='amenities'
              value='Smart TV'
              className='mr-2'
            />
            <label htmlFor='amenity_smart_tv'>Smart TV</label>
          </div>
          <div>
            <input
              type='checkbox'
              id='amenity_serviced'
              name='amenities'
              value='Serviced'
              className='mr-2'
            />
            <label htmlFor='amenity_coffee_maker'>Serviced</label>
          </div>
        </div>
      </div>

      <div className='mb-4 bg-blue-50 p-4'>
        <label className='block text-gray-700 font-bold mb-2'>
          Rates (Leave blank if not applicable)
        </label>
        <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
          <div className='flex items-center'>
            <label htmlFor='daily_rate' className='mr-2'>
              Daily
            </label>
            <input
              type='number'
              id='daily_rate'
              name='rates.daily'
              className='border rounded w-full py-2 px-3'
            />
          </div>
          <div className='flex items-center'>
            <label htmlFor='yearly_rate' className='mr-2'>
              Yearly
            </label>
            <input
              type='number'
              id='yearly_rate'
              name='rates.yearly'
              className='border rounded w-full py-2 px-3'
            />
          </div>
          <div className='flex items-center'>
            <label htmlFor='salePrice_rate' className='mr-2'>
              Sales Price
            </label>
            <input
              type='number'
              id='salePrice_rate'
              name='rates.salePrice'
              className='border rounded w-full py-2 px-3'
            />
          </div>
        </div>
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
<div className='mb-4'>
        <label
          htmlFor='seller_name'
          className='block text-gray-700 font-bold mb-2 ml-1'
        >
          Seller Name
        </label>
        <input
          type='text'
          id='seller_name'
          name='seller_info.name.'
          className='border rounded w-full py-2 px-3'
          placeholder='Name'
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='seller_email'
          className='block text-gray-700 font-bold mb-2 ml-1'
        >
          Seller Email
        </label>
        <input
          type='email'
          id='seller_email'
          name='seller_info.email'
          className='border rounded w-full py-2 px-3'
          placeholder='Email address'
          required
        />
      </div>
      <div className='mb-4'>
        <label
          htmlFor='seller_phone'
          className='block text-gray-700 font-bold mb-2'
        >
          Seller Phone
        </label>
        <input
          type='tel'
          id='seller_phone'
          name='seller_info.phone'
          className='border rounded w-full py-2 px-3'
          placeholder='Phone'
        />
      </div>
      <div className='mb-4'>
  <div className="flex items-center">
    <input
      type='checkbox'
      id='is_featured'
      name='is_featured'
      className='border rounded w-6 h-6 mr-2 mt-10'
    />
    <span className='text-gray-700 mt-10 font-bold'>Featured Product</span> 
  </div>
</div>
</div>
      <div className='mb-4'>
        <label htmlFor='images' className='block text-gray-700 font-bold mb-2'>
          Images (Select up to 4 images)
        </label>
        <input
          type='file'
          id='images'
          name='images'
          className='border rounded w-full py-2 px-3'
          accept='image/*'
          multiple
          required
        />
      </div>

      <div>
      <button
          type="submit"
          disabled={loading}
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline'
        >
          {loading ? 'Adding...' : 'Add Property'}
        </button>
      </div>
    </form>
  );
};

export default PropertyAddForm;