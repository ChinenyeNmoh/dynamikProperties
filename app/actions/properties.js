'use server';
import connectDB from "@/config/db";
import Property from "@/models/property";
import { cloudinaryUploadImage, deleteImage } from "@/utils/cloudinary";
import getUser from "@/utils/protect";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


// Add a new property
const addProperty = async (formData) => {
    console.log(formData);
    await connectDB();
    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized user");
    }

    if (!formData) {
      throw new Error("All fields are required");
    }

    // Access all values for amenities and images
    const amenities = formData.getAll('amenities');
    const images = formData.getAll('images').filter((image) =>  image.name !== 'undefined');


    // Upload images
    const imageUrl = await cloudinaryUploadImage(images);
    console.log('imageUrl, I want to create new product', imageUrl);

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
        salePrice: formData.get('rates.salePrice'),
      },
      is_luxury: formData.get('is_luxury') === 'on',
      is_featured: formData.get('is_featured') === 'on',
      seller_info: {
        sellerName: formData.get('seller_info.sellerName'),
        email: formData.get('seller_info.email'),
        phone: formData.get('seller_info.phone'),
      },
      owner: user._id,
      images: imageUrl,
    };

    const newProperty = await Property.create(propertyData);
    console.log('New property added successfully:', newProperty._id); 
  revalidatePath('/', 'layout');
  redirect(`/properties/${newProperty._id}`);
};


// Update an existing property
const updateProperty = async ( propertyId, formData) => {
  console.log(formData);
  await connectDB();

  const user = await getUser();

  if (!user) {
    throw new Error("Unauthorized user");
  }

  if (!formData) {
    throw new Error("All fields are required");
  }

  // Check if the property exists
  const property = await Property.findById(propertyId);
  if (!property) {
    throw new Error("Property not found");
  }

  // Handle amenities and images from formData
  const amenities = formData.getAll('amenities');
  const newImages = formData.getAll('images').filter((image) => image.name !== 'undefined');
  console.log('newImages', newImages);
  let existingImages = property.images;

  if (newImages.length > 0) {
    // Prepare to delete existing images
    const publicIds = existingImages.map((imageUrl) => {
      const parts = imageUrl.split('/');
      return parts.at(-1).split('.').at(0); // Extract the public ID
    });

    // Delete images from Cloudinary
    if (publicIds.length > 0) {
      await Promise.all(publicIds.map(publicId => deleteImage('properties/' + publicId)));
      console.log('Old images deleted successfully');
    }

    // Upload new images to Cloudinary
    existingImages = await cloudinaryUploadImage(newImages);
  }

  // Update property fields with form data
  property.type = formData.get('type');
  property.category = formData.get('category');
  property.name = formData.get('name');
  property.description = formData.get('description');
  property.location = {
    street: formData.get('location.street'),
    city: formData.get('location.city'),
    state: formData.get('location.state'),
    zipcode: formData.get('location.zipcode'),
  };
  property.beds = formData.get('beds');
  property.baths = formData.get('baths');
  property.square_feet = formData.get('square_feet');
  property.amenities = amenities;
  property.rates = {
    daily: formData.get('rates.daily'),
    yearly: formData.get('rates.yearly'),
    salePrice: formData.get('rates.salePrice'),
  };
  property.is_luxury = formData.get('is_luxury') === 'on';
  property.is_featured = formData.get('is_featured') === 'on';
  property.seller_info = {
    sellerName: formData.get('seller_info.sellerName'),
    email: formData.get('seller_info.email'),
    phone: formData.get('seller_info.phone'),
  };
  property.images = existingImages;

  // Save the updated property to the database
  const updatedProperty = await Property.findByIdAndUpdate(
    propertyId,
    property,
    { new: true }
  );

  revalidatePath('/', 'layout');
  redirect(`/properties/${updatedProperty._id}`);
};



// Delete a property
const deleteProperty = async (propertyId) => {
  try {
    await connectDB();

    const user = await getUser();

    if (!user) {
      throw new Error("Unauthorized user");
    }

    const property = await Property.findById(propertyId);

    if (!property) {
      throw new Error("Property not found");
    }

    // Check if the user is the owner of the property
    if (property.owner.toString() !== user._id.toString()) {
      throw new Error("You are not authorized to delete this property");
    }

     // extract public id's from image url in DB
  const publicIds = property.images.map((imageUrl) => {
    const parts = imageUrl.split('/');
    return parts.at(-1).split('.').at(0);
  });
  
  // Delete images from cloudinary
  if(publicIds.length > 0) {
    await Promise.all(publicIds.map(publicId => deleteImage('properties/' + publicId)));
    console.log('Images deleted successfully');
  }

    await Property.findByIdAndDelete(propertyId);

    return { success: true, message: "Property deleted successfully" };
  } catch (error) {
    console.error("Error deleting property:", error.message);
    throw new Error(error.message);
  }
};

export { addProperty, updateProperty, deleteProperty };
