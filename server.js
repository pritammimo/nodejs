const path=require('path');
const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const colors=require('colors');
const fileupload=require('express-fileupload')
const connectDB=require('./config/db');
const errorHandler=require('./middleware/error');
//Load env files
dotenv.config({path:'./config/config.env'});

//Connect to Database
connectDB();
//Route files
const bootcamps=require('./routes/bootcamps');
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const app=express();
//Body parser
app.use(express.json())
// Dev logging Middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}
//File uploading
app.use(fileupload());
//Set static Folder
app.use(express.static(path.join(__dirname,'public')))
//Mount routers
app.use('/api/v1/bootcamps',bootcamps);
app.use("/api/v1/courses", courses);
app.use('/api/v1/auth',auth);

app.use(errorHandler);
const PORT=process.env.PORT || 5000;
 const server=app.listen(PORT,console.log(`Server running into ${process.env.NODE_ENV}
 mode on port ${PORT}`.yellow.bold));
 //Handle unhandled rejection
 process.on('unhandleRejection',(err,promise)=>{
    console.log(`Error:${err.message}`.red) 
    //close server & exit process
    server.close(()=>process.exit(1)); //check 
 })