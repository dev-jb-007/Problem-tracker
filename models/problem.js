const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const problemSchema=new Schema({
    name:{
        type:String
    },
    site:{
        type:String
    },
    link:{
        type:String
    },
    status:{
        type:String,
        default:'Not Started'
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    duration:{
        type:Number,
        default:0
    }
})

module.exports=mongoose.model('problem',problemSchema);