const user = require("../model/user");

//create token and saving in the cookies
const sendToken = (user, statusCode, res) => {
const token = user.getJwtToken();
let jwtExpiry = process.env.JWT_EXPIRES 
let cookieExpiry;
if(jwtExpiry.endsWith('d')){
    cookieExpiry = parseInt(jwtExpiry)*24*60*60*1000
}
else if(jwtExpiry.endsWith('h')){
    cookieExpiry = parseInt(jwtExpiry)*60*60*1000
}
else{
    cookieExpiry = parseInt(jwtExpiry)*60*1000
}

const options ={
    expires: new Date(Date.now()+cookieExpiry),
    httpOnly:true
}
res.status(statusCode).cookie('token',token,options).json({
    success:true,
    token,
    user
})

}

module.exports = sendToken