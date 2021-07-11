const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const colors=require('colors');
const connectDB=require('./config/db');
const errorHandler=require('./middleware/error');
//Load env files
dotenv.config({path:'./config/config.env'});

//Connect to Database
connectDB();
//Route files
const bootcamps=require('./routes/bootcamps');
const courses = require("./routes/courses");

const app=express();
//Body parser
app.use(express.json())
// Dev logging Middleware
if(process.env.NODE_ENV ==='development'){
    app.use(morgan('dev'))
}
//Mount routers
app.use('/api/v1/bootcamps',bootcamps);
app.use("/api/v1/courses", courses);


app.use(errorHandler);
const PORT=process.env.PORT || 5000;
 const server=app.listen(PORT,console.log(`Server running into ${process.env.NODE_ENV}
 mode on port ${PORT}`.yellow.bold));
 //Handle unhandled rejection
 process.on('unhandleRejection',(err,promise)=>{
    console.log(`Error:${err.message}`.red) 
    //close server & exit process
    server.close(()=>process.exit(1));
 })