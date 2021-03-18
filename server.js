const app = require ('./app')
const connectDatabase = require ('./config/database')

const dotenv = require ('dotenv');
const cloudinary = require ('cloudinary')
process.on('uncaughtException',err =>{
    console.log(`Error : ${err.stack}`);
    console.log('Shutting down due to uncaught errors');
    process.exit(1)
})

dotenv.config({path : 'backend/config/config.env'})

connectDatabase();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const server = app.listen(process.env.PORT, () =>{
    console.log(`Server started on PORT : ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

 process.on('unhandled rejection' , err => {
     console.log(`Error : ${err.message}`);
     console.log('Shutting down server due to unhamdled promise rejection ');
     server.close(()=>{
         process.exit(1)
     })
 })