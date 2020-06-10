const mongoose=require('mongoose')
const bycpt=require('bcryptjs')
const jwt=require('jsonwebtoken');
const user_Schema=new mongoose.Schema({

        name:{
            type:String,
            required:[true,"Please add a name"]
        },
        email:{
            type:String,
            unique:true,
            required:[true,"Please add an email"]
        },
        role:{
            type:String,
            enum:['user','publisher'],
            default:'user'
        },
        password:{
            type:String,
            required:[true,'please add a password'],
            select:false
        },
        createdAt:{
            type:Date,
            default:Date.now
        },
        resetPasswordToken:String,
        resetPasswordExpire:Date


    
});
//Encrypt password using middleware
user_Schema.pre('save',async function(next){
const salt=await bycpt.genSalt(8);
this.password=await bycpt.hash(this.password,salt);
});
user_Schema.methods.signedJWTTokens=function(){
    return jwt.sign({id:this._id},"jsdndnfidnifni")
}
user_Schema.methods.getHashedPassword=async function(enteredPass){
    return await bycpt.compare(enteredPass,this.password);
}



module.exports=mongoose.model('User',user_Schema);