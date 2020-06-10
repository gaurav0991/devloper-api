const User=require('../models/user_model');
const express=require('express');
const router=express.Router();
//@route /api/v1/auth/register
//@desc Register a user
router.post('/register',async function(req,res){
try {
// create a user
const {name,email,password,role}=req.body;
const user=await User.create({
    name,email,password,role
});  
  sendTokenResponse(user,200,res)

} catch (error) {
    console.log(error);
    res.status(404).json({success:false,msg:error})
}
});
//@route /api/v1/auth/login
//@desc Login a user
router.post('/login',async function(req,res){
    try {
        const {name,email}=req.body;
    const user=await User.findOne({email}).select('+password')
    //check for user
    if(!user)
    {
        return res.status(400).json({success:false,msg:"User not availabe"})
    }
    const matchPass=user.getHashedPassword();
    if(!matchPass)
    {
      return  res.status(200).json({success:false,msg:"Invalid credential"})

    }
    sendTokenResponse(user,200,res)
    } catch (error) {
        console.log(error);
        res.status(404).json({success:false,msg:error})
    }
    });
// fetch token from model create cookie and send response

const sendTokenResponse=(user,status,res)=>{
        // create a token
        const token =user.signedJWTTokens();
        const options={
            expires:new Date(Date.now()+30*24*60*60*1000),
            httpOnly:true,

        };
        res.status(status).cookie('token',token,options).json({success:true,token,user:user.toJSON()})
}


module.exports=router;