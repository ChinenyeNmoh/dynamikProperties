import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyDetails = ({ property }) => {
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{property.type}</div>
        {property.category === 'rent' ? (
          <h2 className='font-bold text-red-600'>For Rent</h2>
        ) : property.category === 'buy' ? (
          <h2 className='font-bold text-red-600'>For Sale</h2>
        ) : (
          <h2 className='font-bold text-red-600'>For Shortlet</h2>
        )}
        <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          <FaMapMarker className="text-orange-700 mt-1 mr-1" />
          <p className="text-orange-700">
            {property.location.street}, {property.location.city} {property.location.state}
          </p>
        </div>

        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2"></h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-2xl font-bold text-blue-500">
              {property.rates.daily ? (
                <span>
                  N{property.rates.daily.toLocaleString()} per night
                </span>
              ) : property.rates.yearly ? (
                <span>
                  N{property.rates.yearly.toLocaleString()} yearly
                </span>
              ) : (
                <span>
                  Sales price: N{property.rates.salePrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Description & Details</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            <FaBed className="inline-block mr-2" /> {property.beds}{' '}
            <span className="hidden sm:inline">Beds</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" /> {property.baths}{' '}
            <span className="hidden sm:inline">Baths</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" /> {property.square_feet}{' '}
            <span className="hidden sm:inline">sqft</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4">{property.description}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Amenities</h3>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 list-none space-y-2">
          {property.amenities.map((amenity, index) => (
            <li key={index}>
              <FaCheck className="inline-block text-green-600 mr-2" /> {amenity}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6"></div>
    </main>
  );
};

export default PropertyDetails;