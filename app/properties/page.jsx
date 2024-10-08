import PropertyCard from '@/components/PropertyCard';
import connectDB from '@/config/db';
import Property from '@/models/property';
import Pagination from '@/components/Pagination';
import PropertySearchForm from '@/components/PropertySearchForm';

const PropertiesPage = async ({ searchParams: { pageSize = 9, page = 1, location = '' } }) => {
  // Connect to the database
  await connectDB();
  const skip = (page - 1) * pageSize;

  // Build the query for filtering properties based on the location
  const totalQuery = location
    ? {
        $or: [
          { 'location.street': { $regex: location, $options: 'i' } },
          { 'location.city': { $regex: location, $options: 'i' } },
          { 'location.state': { $regex: location.trim(), $options: 'i' } },
          { 'location.zipcode': { $regex: location.trim(), $options: 'i' } },
        ],
      }
    : {};

  // Get the total number of properties matching the query
  const total = await Property.countDocuments(totalQuery);
  // Fetch properties with pagination
  const properties = await Property.find(totalQuery).skip(skip).limit(pageSize);
  

  // Determine if pagination should be shown
  const showPagination = total > pageSize;

  return (
    <>
      <section className=' py-4'>
        <div className='max-w-7xl block mx-auto'>
          <PropertySearchForm />
        </div>
      </section>
      <section className='px-4 py-6'>
        <div className='container-xl lg:container m-auto px-4 py-6'>
          <h1 className='text-2xl mb-4'>Browse Properties</h1>
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {properties.map((property, index) => (
                <PropertyCard property={property} key={property._id || index} />
              ))}
            </div>
          )}
          {showPagination && (
            <Pagination
              page={parseInt(page)}
              pageSize={parseInt(pageSize)}
              totalItems={total}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default PropertiesPage;
