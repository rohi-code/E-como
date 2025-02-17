const express = require('express')
const ErrorHandler = require('./middleware/error')
const app = express()
const cookieParser = require('cookie-parser')
const cors = require('cors')

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use("/",express.static('uploads'))


if(process.env.NODE_ENV!=="PRODUCTION"){
    require('dotenv').config({path:"backend/config/env"})
}


//routes
const user = require('./controller/user')


app.use('/api',user)


app.use(ErrorHandler)
module.exports=app