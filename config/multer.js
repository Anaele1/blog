// Two storage(Cloudinary and Local}! Comment out one depending on the one you want work on.
const multer  = require('multer');
const path = require('path');
const { storage } = require('./cloudinary'); // For Cloudinary Storage

// // For Local Storage
// const storage = multer.diskStorage({
//     // Image location
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, '../public/uploads')); // folder where images live
//   },
//   // Image name on upload and save
//   filename: (req, file, cb) => {
//     const uniqueName = Date.now() + '' + file.originalname;
//     cb(null, uniqueName);
//   }
// });

const upload = multer({ storage } );

module.exports = upload;