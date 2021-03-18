const express = require ('express');
const app= express();
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cloudinary = require('cloudinary')
const fileUpload= require('express-fileupload')

const errorMiddleware = require ('./middleware/errors')

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser()) 
app.use(fileUpload());

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const students = require('./routes/student');
const auth = require('./routes/auth');

app.use('/api/v1', students)
app.use('/api/v1', auth)

app.use(errorMiddleware);

module.exports=app 