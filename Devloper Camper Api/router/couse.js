const express=require('express');
const Bootcamp_model=require('../models/bootcamp_model');
const {protect}=require('../middleware/auth')

const courseScehma=require('../models/course_model')
const router=express.Router({mergeParams:true})
//get a particular course bt bootcamp id or all the course depending on bootcamp id
// @route /api/v1//bootcamps/:bootcampId/courses
//@ route  /api/v1/course

router.get('/',function(req,res){
    console.log("In course");
    if(req.params.bootcampId===undefined){
    console.log(req.params.bootcampId);

        courseScehma.find().populate('bootcamp').then(d=>{    res.status(200).json({success:true,count:d.length,data:d})}).catch(e=>{res.status(400).json({success:false,msg:e})});
        return ;
    }
    else{
        courseScehma.find({bootcamp:req.params.bootcampId}).then(d=>{    res.status(200).json({success:true,count:d.length,data:d})}).catch(e=>{res.status(400).json({success:false})});
        
    }
})
//update a course
// route /api/v1/course/:id
router.put('/:id',protect,async function(req,res){
    courseScehma.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators:true
    }).then(d=>{res.status(200).json({
        success:true,
        data:d
    })}).catch(e=>res.status({
        success:false
    }));
});

//delete a course
// route /api/v1/course/:id
router.delete('/:id',protect,async function(req,res){
    courseScehma.findByIdAndDelete(req.params.id).then(d=>{res.status(200).json({
        success:true,
        data:d
    })}).catch(e=>res.status({
        success:false
    }));
});

//@desc post a cousre witha bootcamp id
//@route /api/v1/bootcamps/:bootcampId/courses

router.post('/',async function(req,res,next){
    req.body.bootcamp=req.params.bootcampId;
    try{
    console.log(req.params.bootcampId);
    const bootcamp=await Bootcamp_model.findById(req.params.bootcampId);
    if(!bootcamp)
    {
        console.log("Not found")
        return res.status(400).json({ success:false,msg:" Id  not found"});
    }
    else{
    
        courseScehma.create(req.body).then(d=>{
            res.status(200).json({
                success:true,
                data:d
            })
        }).catch((e)=>{res.status(400).json({
            success:false,
            msg:e
        })})
    
    } 
}
catch (error) {
    console.log("Error");
    return res.status(400).json({ success:false,msg:error});
}
})
module.exports=router;