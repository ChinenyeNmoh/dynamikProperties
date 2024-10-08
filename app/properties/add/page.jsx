import PropertyAddForm from '@/components/PropertyAddForm';
import connectDB from '@/config/db';
import type from '@/models/type';
import category from '@/models/category';
import { convertToSerializeableObject } from '@/utils/convertToObject';

const PropertyAddPage = async () => {
  await connectDB();
  const typesDoc = await type.find({}).lean();
  const categoriesDoc = await category.find({}).lean();
  const types = typesDoc.map(convertToSerializeableObject);
  const categories = categoriesDoc.map(convertToSerializeableObject);
  return (
    <section className=''>
      <div className='container m-auto max-w-2xl py-24'>
        <div className='bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0'>
          <PropertyAddForm types={types} categories={categories}/>
        </div>
      </div>
    </section>
  );
};
export default PropertyAddPage;