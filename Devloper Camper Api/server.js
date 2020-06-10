const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
//Routes Files
const routes=require('./router/bootcamp.js');
const courseRoutes=require('./router/couse.js')
const authRoute=require('./router/auth');
mongoose.connect('mongodb://localhost/bootcamp').then(()=>console.log("connected to database"))

dotenv.config({path:'./config/config.env'});
const app=express();
app.use(express.json())
app.use('/api/v1/bootcamps',routes)
app.use('/api/v1/course',courseRoutes)
app.use('/api/v1/auth',authRoute)

const PORT =process.env.PORT || 5000;
app.get('/',(req,res)=>{
    console.log(req.body);
    res.send("Hello"); 
})
app.listen(PORT,console.log(`Server running in ${process.env.PORT}`))
