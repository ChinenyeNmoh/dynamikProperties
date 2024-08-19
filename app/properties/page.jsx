import PropertyCard from '@/components/PropertyCard'
import connectDB from '@/config/db'
import Property from '@/models/property'


// /properties route
const Propertiespage = async () => {
  await connectDB();
 
  const properties = await Property.find({}).lean(); //lean() method returns a plain JavaScript object, not a Mongoose document
  return (
    <>
    <section className='px-4 py-6'>
      <div className='container-xl lg:container m-auto px-4 py-6'>
        <h1 className='text-2xl mb-4'>Browse Properties</h1>
        {properties.length === 0 ? (
          <p>No properties found</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {properties.map((property, index) => (
              <PropertyCard property={property} key={index} />
            ))}
          </div>
        )}
       
      </div>
    </section>
  </>
  )
}

export default Propertiespage