const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Bootcamp = require("../models/Bootcamp");
const User = require("../models/User");
//@desc Register user
//@get routes GET /api/v1/auth/register
//@access     Public
exports.register=asyncHandler(async(req,res,next)=>{
    const {name,email,password,role}=req.body;
    //Create user
    const user=await User.create({
        name,email,password,role
    });
    //create token
    const token = user.getSignedJwtToken();
    res.status(200).json({success:true,token})
})
//@desc Login user
//@get routes POST /api/v1/auth/login
//@access     Public
exports.login=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;
   //Validate email and password
   if(!email || !password){
     return next(new ErrorResponse('Please Provide an Email',400));
   }
   //Check for User
   const user=await User.findOne({email}).select('+password');
   if(!user){
    return next(new ErrorResponse('Invalid credientials',401))
   }
   //Check if Passwowrd matches
   const isMatch = await user.matchPassword(password);
   if(!isMatch){
      return next(new ErrorResponse("Invalid credientials", 401));
   }
    //create token
    const token = user.getSignedJwtToken();
    res.status(200).json({success:true,token})
})