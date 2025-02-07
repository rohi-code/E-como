const express = require('express');
const { upload } = require('../multer');
const User = require('../model/user');
const path = require('path');
const fs = require('fs');
const ErrorHandler = require('../utils/ErrorHandler');

const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const userEmail = await User.findOne({ email });
    if (userEmail) {
        if (req.file) {
            const filePath = path.join(__dirname, '..', 'uploads', req.file.filename);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        }
        return next(new ErrorHandler("User already exists", 400));
    }
    if (!req.file) {
        return next(new ErrorHandler("No file uploaded", 400));
    }
    // Get the uploaded file information
    const fileName = req.file.filename;

    // Assuming files are uploaded in an 'uploads' directory
    const fileUrl = path.join(__dirname, '..', 'uploads', fileName);  // Adjust path accordingly

    // Create the new user object
    const user = new User({
        name,
        email,
        password,
        avatar: { url: fileUrl, id: fileName }
    });
    console.log(user)

     try {
         // Save the new user to the database
         await user.save()
         // Return a success response
         res.status(201).json({ message: "User created successfully", user });
     } catch (error) {
         return next(new ErrorHandler(error.message, 500));
     }
});

module.exports = router;
