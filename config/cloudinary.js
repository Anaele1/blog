const cloudinary = require('cloudinary');
const CloudinaryStorage = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'writersImgdir',
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
        transformation: [{width: 800, height: 600, crop: 'limit'}]
    }
});

module.exports = {storage, cloudinary};