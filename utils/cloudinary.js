import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload images to Cloudinary
const cloudinaryUploadImage = async (images) => {
  try {
    const imageUrls = [];

    for (const imageFile of images) {
      const imageBuffer = await imageFile.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert the image data to base64
      const imageBase64 = imageData.toString('base64');
     
      // Get MIME type of the file
      const mimeType = imageFile?.type;
      console.log(mimeType);

      if (!mimeType) {
        throw new Error('Invalid file format. Could not determine the MIME type.');
      }

      // Upload image to Cloudinary using base64 data URI
      const result = await cloudinary.uploader.upload(
        `data:${mimeType};base64,${imageBase64}`,
        { folder: "properties" }
      );

      
      imageUrls.push(result.secure_url);
      console.log(`Image uploaded successfully with URL: ${result.secure_url}`);
    }

    return imageUrls;
  } catch (error) {
    console.error('Error uploading images:', error);
    throw new Error(`Error uploading images: ${error.message}`);
  }
};

// Delete image from Cloudinary
const deleteImage = async (imageId) => {
  try {
    await cloudinary.uploader.destroy(imageId);
    console.log(`Image deleted successfully with ID: ${imageId}`);
  } catch (error) {
    console.error('Error deleting image:', error.message);
    throw new Error(`Error deleting image: ${error.message}`);
  }
};



export default cloudinary;
export {  cloudinaryUploadImage, deleteImage };