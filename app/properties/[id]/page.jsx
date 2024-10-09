import connectDB from '@/config/db';
import Property from '@/models/property'
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import PropertyDetails from '@/components/PropertyDetails';
import PropertyImages from '@/components/PropertyImages';
import {convertToSerializeableObject} from '@/utils/convertToObject';


const PropertyPage = async ({ params }) => {
  await connectDB();
  const propertyDoc = await Property.findById(params.id)
    .populate('type')
    .populate('category') 
    .lean();
  const property = convertToSerializeableObject(propertyDoc);
 


  if (!property) {
    
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      <PropertyHeaderImage image={property.images[0]} />
      <section>
        <div className='container m-auto py-6 px-6'>
          <Link
            href='/properties'
            className='text-blue-500 hover:text-blue-600 flex items-center'
          >
            <FaArrowLeft className='mr-2' /> Back to Properties
          </Link>
        </div>
      </section>
      <section className='bg-blue-50'>
        <div className='container m-auto py-10 px-6'>
          <div className='grid grid-cols-1 md:grid-cols-70/30 w-full gap-6'>
           

            {/* <!-- Sidebar --> */}
            <aside className='space-y-4'>
              <PropertyDetails property={property} />
             
            </aside>
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
      
    </>
  );
};
export default PropertyPage;