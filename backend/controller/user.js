const express = require('express');
const { upload } = require('../multer');
const User = require('../model/user');
const path = require('path');
const fs = require('fs');
const ErrorHandler = require('../utils/ErrorHandler.js');
const jwt = require('jsonwebtoken');
const sendMail = require('../utils/mail');
const sendToken = require('../utils/jwtToken'); 




const router = express.Router();

router.post("/create-user", upload.single("file"), async (req, res, next) => {
   try{ const { name, email, password } = req.body;

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
    const user = {
        name: name,
        email: email,
        password:password,
        avatar: fileUrl
    };
    console.log(user)
const activationToken = createActivationToken(user)
const activationUrl=`${process.env.FRONTEND_URL}/activation/${activationToken}`

try{
await sendMail({
    email:user.email,
    subject:"Activate your account",
    message:`hello ${user.name} click on the link to activate your account ${activationUrl}`
})
res.status(201).json({
    success:true,
    message:"Account created successfully, please check your email to activate your account"
})}
catch(error){
    return next(new ErrorHandler(error.message,500))

}}
     catch (error) {
         return next(new ErrorHandler(error.message, 400));
     }
});

const createActivationToken = (user) => {
 //   const payload = { user };
    return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: 300 });
}



router.post("/activate", async (req, res, next) => {
try{
    const {activationToken}=req.body
const newUser=jwt.verify(activationToken,process.env.ACTIVATION_SECRET)
if(!newUser){
    return next(new ErrorHandler("Invalid token or token expired",400))
}
const {name,email,password,avatar}=newUser
const user=await User.create({
    name,
    email,
    password,
    avatar


})

sendToken(user,200,res)}
catch(error){
    return next(new ErrorHandler(error.message,500))
}

})






module.exports = router;
