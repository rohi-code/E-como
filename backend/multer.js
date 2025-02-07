const multer = require('multer')
const path = require('path');  // Import the path module

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniSuffix = Date.now() + Math.round(Math.random() * 1e9);
        const fileName = file.originalname.split('.')[0];  // Get the base name of the file
        const fileExtension = path.extname(file.originalname);  // Get the file extension
        cb(null, uniSuffix + fileName + fileExtension);  // Preserve original extension
    }
});

const upload = multer({ storage: storage });

module.exports = {upload};
