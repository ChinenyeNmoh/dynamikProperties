import PropertyEditForm from '@/components/PropertyEditForm';
import connectDB from '@/config/db';
import Property from '@/models/property';
import type from '@/models/type';
import category from '@/models/category';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const PropertyEditPage = async ({ params }) => {
  await connectDB();

  const propertyDoc = await Property.findById(params.id)
  .populate('type')
   .populate('category')
  .lean();
  const property = convertToSerializeableObject(propertyDoc);
  console.log(typeof property.type);
  console.log(typeof property.category);
  const typesDoc = await type.find({}).lean();
  const categoriesDoc = await category.find({}).lean();
  const types = typesDoc.map(convertToSerializeableObject);
  const categories = categoriesDoc.map(convertToSerializeableObject);

  if (!property) {
    return (
      <h1 className='text-center text-2xl font-bold mt-10'>
        Property Not Found
      </h1>
    );
  }

  return (
    <section className='bg-blue-50'>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyEditForm 
          property={property} 
          types={types}
          categories={categories}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyEditPage;