const mongoose=require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("Succesfully Connected to Database");
}).catch(err=>{
    console.log(err);
});