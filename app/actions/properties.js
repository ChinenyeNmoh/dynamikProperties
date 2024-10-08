'use server';

import connectDB from "@/config/db";
import Property from "@/models/property";
import { cloudinaryUploadImage } from "@/utils/cloudinary";
import getUser from "@/utils/protect";
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

//Add a new property
const addProperty = async (formData) => {
  console.log(formData);
    await connectDB();

    const user = await getUser();
    console.log(user);
    if (!user) {
        throw new Error("Unauthorized user");
    }

    if (!formData) {
        throw new Error("All fields are required");
    }

    try {
        // Access all values for amenities and images
        const amenities = formData.getAll('amenities');
        const images = formData.getAll('images').filter((image) => image.name !== '');
        console.log(images);
        const imageUrl = await cloudinaryUploadImage(images);
        

        const propertyData = {
            type: formData.get('type'),
            category: formData.get('category'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
              street: formData.get('location.street'),
              city: formData.get('location.city'),
              state: formData.get('location.state'),
              zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities,
            rates: {
              daily: formData.get('rates.daily'),
              yearly: formData.get('rates.yearly'),
              salePrice: formData.get('rates.salePrice.'),
            },
            is_luxury: formData.is_luxury === 'on',
            is_featured: formData.is_featured === 'on',
            seller_info: {
              name: formData.get('seller_info.name'),
              email: formData.get('seller_info.email'),
              phone: formData.get('seller_info.phone'),
            },
            owner: user._id,
            images: imageUrl,
          };

          const newProperty = new Property(propertyData);
          await newProperty.save();
       return { success: true, message: "Property added successfully" };
    } catch (error) {
      console.error("Error adding property:", error.message);
        throw new Error(error.message);

    }
};

export { addProperty };