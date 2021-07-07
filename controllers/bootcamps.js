//@get bootcamps
//@get routes GET /api/v1/bootcamps
//@access     Public
exports.getBootcamps=(req,res,next)=>{

    res.status(200).json({success:true,
        msg:'show all bootcamps'});
}
//@get  single bootcamp
//@get routes GET /api/v1/bootcamps/id
//@access     Public
exports.getBootcamp=(req,res,next)=>{
    res.status(200).json({success:true,msg:`show Bootcamp of ${req.params.id}`})
}
//@get  create bootcamp
//@get routes POST /api/v1/bootcamps/id
//@access     Private
exports.createBootcamp=(req,res,next)=>{
    res.status(200).json({success:true,msg:'create new bootcamps'})
}
//@get  update bootcamp
//@get routes PUT /api/v1/bootcamps/:id
//@access     Private
exports.updateBootcamp=(req,res,next)=>{
    res.status(200).json({success:true,msg:`update Bootcamp of ${req.params.id}`})
}
//@get  delete bootcamp
//@get routes  DELETE   /api/v1/bootcamps/:id
//@access     Private
exports.deleteBootcamp=(req,res,next)=>{
 res.status(200).json({success:true,msg:`Delete Bootcamp of ${req.params.id}`})
}