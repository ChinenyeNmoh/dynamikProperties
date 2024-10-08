import PropertyCard from '@/components/PropertyCard'
import Hero from '@/components/Hero'
import Link from "next/link"
import connectDB from '@/config/db'
import Property from '@/models/property'

const Homepage = async() => {
  connectDB();
  const homeProperties = await Property.find({is_featured: true}).lean();
  
  return (
    <div>
      <Hero />
      <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-10 text-center font-bold'>Featured Properties</h1>
        {homeProperties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {homeProperties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        )}
       
      </div>
    </section>
    <section className='m-auto w-44  px-2'>
        <Link
          href='/properties'
          className='block bg-orange-600 text-white text-center w-auto p-2 rounded-xl hover:bg-gray-700'
        >
          View All Properties
        </Link>
      </section>
    </div>
  )
}

export default Homepage