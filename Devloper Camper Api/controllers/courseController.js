// exports.getCourses=asyncHandler(async(req,res,next)=>{
//     let query;
//     if(req.param.bootcampId){
//         console.log(req.params.bootcampId);

//        query= courseScehma.find({bootcamp:req.params.bootcampId}).then(d=>{    res.status(200).json({success:true,count:d.length,data:d})}).catch(e=>{res.status(400).json({success:false})});

//     }
//     else{
//     query=courseScehma.find()
// }
//     const course = await query;
//     res.status(200).json({
//         success:true,
//         count:course.length,
//         data:course
//     })
// })