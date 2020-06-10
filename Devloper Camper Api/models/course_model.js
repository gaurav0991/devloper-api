const moongse=require('mongoose');
const CourseSchema=moongse.Schema({
    title:{
        type:String,
        required: [true, 'Please add a Course name'],
        trim: true,
        maxlength: [90, 'Course Name can not be more than 50 characters']
      },
      description:{
        type:String,
        required: [true, 'Please add a Course Description'],
        trim: true,
        maxlength: [290, 'Course Name can not be more than 290 characters']
     
      },
      weeks:{
          
        type:String,
        required: [true, 'Please add a Week'],
        
      },
      tuition:{
          type:Number,
          required:[true,'Please add a tution cose']
      },
      minimumSkill:{
          type:String,
          required:[true,'Please add a skill'],
          enum:['beginner','intermediate','advanced']
      },
      
      scholarhipsAvailable:{
        type:Boolean,
        default:false
    },
    scholarhipsAvailable:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    bootcamp:{
        type:moongse.Schema.ObjectId,
        ref:'Bootcamp',
    }
});
module.exports=moongse.model('Course',CourseSchema);