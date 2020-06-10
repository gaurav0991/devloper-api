const express=require('express');
const Bootcamp_model=require('../models/bootcamp_model');
const courseRouter=require('./couse')
const router=express.Router()
const {protect}=require('../middleware/auth')
//Get all bootcamps
router.get('/',(req,res)=>{
    Bootcamp_model.find(req.query).populate('Courses').then(d=>{res.status(200).json({success:true,count:d.length,data:d})}).catch(e=>{res.status(400).json({success:false})});
})
router.use('/:bootcampId/courses',courseRouter)
//@ desc Get a bootcamp by id
//@route /api/v1/bootcamp
router.get('/:id',(req,res)=>{
    Bootcamp_model.findById(req.params.id).then((d)=>res.status(200).json({
        success:true,
        data:d
    })).catch(e=>{res.status(400).json({
        success:false
    })})
});
router.post('/',protect,(req,res)=>{
    
        Bootcamp_model.create(req.body).then((d)=>{
            res.status(200).json({
                success:true,
                data:d
            })
        }).catch(e=>{
            res.status(400).json({success:false})

        });  
    
});
router.put('/:id',protect,(req,res)=>{
    Bootcamp_model.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    }).then(d=>{res.status(200).json({
        success:true,
        data:d
    })}).catch(e=>res.status({
        success:false
    }));
},protect)
router.delete('/:id',protect,async function(req,res){
try{
    const bootcamp=await Bootcamp_model.findById(req.params.id);
bootcamp.remove()
res.status(200).json({ success:true,
    data:{}});
} catch(e){
    res.status(400).json({success:false,msg:e})
}
},protect)
module.exports=router;