const { json } = require('express');
const Bootcamp=require('../models/Bootcamp');

//@get bootcamps
//@get routes GET /api/v1/bootcamps
//@access     Public
exports.getBootcamps= async(req,res,next)=>{
try {
    const bootcamps=await Bootcamp.find();
    res.status(200).json({
        success:true,count:bootcamps.length,data:bootcamps
    })
} catch (err) {
    res.status(400).json({success:false})
}
}
//@get  single bootcamp
//@get routes GET /api/v1/bootcamps/id
//@access     Public
exports.getBootcamp=async(req,res,next)=>{
    try {
        const bootcamp=await Bootcamp.findById(req.params.id);
        if(!bootcamp){
        return res.status(400).json({ success: false });
        }
        res.status(200).json({success:true,data:bootcamp})
    } catch (err) {
            // res.status(400).json({ success: false });
            next(err);
    }
   
}
//@get  create bootcamp
//@get routes POST /api/v1/bootcamps/id
//@access     Private
exports.createBootcamp= async(req,res,next)=>{
    try {
        const bootcamp = await Bootcamp.create(req.body);
        res.status(201).json({
          success: true,
          data: bootcamp,
        });
    } catch (err) {
        res.status(400).json({success:false})
    }
   
    // console.log(req.body);
    // res.status(200).json({success:true,msg:'create new bootcamps'})
}
//@get  update bootcamp
//@get routes PUT /api/v1/bootcamps/:id
//@access     Private
exports.updateBootcamp=async(req,res,next)=>{
   try {
       const bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
           new:true,
           runValidators:true
       })
       if(!bootcamp){
           return res.status(400).json({success:false})
       }
       res.status(200).json({success:true,data:bootcamp})
   } catch (err) {
        return res.status(400).json({ success: false });
   }
   //Update complete
}
//@get  delete bootcamp
//@get routes  DELETE   /api/v1/bootcamps/:id
//@access     Private
exports.deleteBootcamp=async(req,res,next)=>{
 try {
     const bootcamp = await Bootcamp.findByIdAndDelete(
       req.params.id);
     if (!bootcamp) {
       return res.status(400).json({ success: false });
     }
     res.status(200).json({ success: true, data: {} });
 } catch (err) {
     return res.status(400).json({ success: false });
 }
}