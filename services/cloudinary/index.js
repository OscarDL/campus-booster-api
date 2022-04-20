const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
cloudinary.config(true);

module.exports = (folderName) => multer({ 
  storage: new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      sign_url: true,
      access_mode: "authenticated",
      return_delete_token: true,
      unique_filename: true,
      folder: 'supinfo',
      allowed_formats: [
        "gif",
        "png",
        "jpg",
        "bmp",
        "ico",
        "pdf",
        "tiff"
      ],
      public_id: (req, file) => {
        const prefix = `${folderName}/${req.user ? req.user.firstName + " " + req.user.lastName : 'public'}`;
        return prefix + "/" + file.originalname.split('.').first() + "_" + new Date().getTime();
      },
    }
  })
});