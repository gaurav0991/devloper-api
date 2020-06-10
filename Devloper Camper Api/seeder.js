//A seeeder for putting the values of a json to database



//fs is a module to handle files
const fs=require('fs');
const moongoose=require('mongoose'); 
const Bootcamp=require('./models/bootcamp_model');
const Course=require('./models/course_model');
// coonect database
moongoose.connect('mongodb://localhost/bootcamp').then(()=>console.log("connected to database"))


//Read json Files
const bootcamps=JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`,'utf-8'));
const course=JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`,'utf-8'));

//Import intoDb
const importData=async()=>{
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(course);
        console.log("Data imporrted")
        process.exit()
    } catch (error) {
        console.log("erros:"+error)
    }
}
//delete the data
const DelData=async()=>{
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();

        console.log("Data destroyed")
        process.exit()
    } catch (error) {
        console.log(error)
    }
}
if(process.argv[2]==='-i')
{
    importData();
}
else if(process.argv[2]==='-d'){
    DelData()
}