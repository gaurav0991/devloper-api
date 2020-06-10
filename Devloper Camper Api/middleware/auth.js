const jwt=require('jsonwebtoken');
const asyncHandler=require('./async');
const User=require('../models/user_model');

exports.protect=asyncHandler(async (req,res,next)=>{
let token;
if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    token=req.headers.authorization.split(' ')[1];

}
if(!token){
    res.status(404).json({success:false,msg:"Not authorize to access this route"})
}
try {
        //verify token
        //token looks like this {id:,iat:,}
        const decoder=jwt.verify(token,"jsdndnfidnifni");
        console.log(decoder);
        req.user=await User.findById(decoder.id)
        next();

} catch (error) {
   
    res.status(404).json({success:false,msg:"Not authorize to access this route"})

    
}
});