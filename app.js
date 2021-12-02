const express=require('express');
require('./config/mongoose');
const app=express();
const Problem=require('./models/problem');
const ejs=require('ejs');
const path=require('path');

//.use
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname+'/static'));

//.set
app.set('view engine','ejs');
app.set('views',__dirname+'/views/template');

app.get('/',(req,res)=>{
    res.render('homepage');
})
app.post('/problem',async (req,res,next)=>{
    try{
        console.log(req.body);
        let problem=new Problem(req.body);
        await problem.save();
        res.send(problem);
    }
    catch(err)
    {
        next(err);
    }
})
app.get('/timer',async (req,res,next)=>{
    try{
        const problems1=await Problem.find({status:'Not Started'});
        const problems2=await  Problem.find({status:"Pending"});
        const problems3=await Problem.find({status:"Solving"});
        problems=problems1.concat(problems2,problems3);
        res.send(problems);
    }
    catch(err)
    {
        next(err);
    }
})
app.post('/timerStartChange',async (req,res,next)=>{
    try{
        let problem=await Problem.findOne({name:req.body.name});
        problem.status='Solving';
        await problem.save();
        res.send({status:'Done'});
    }
    catch(err)
    {
        next(err);
    }
})
app.post('/timerStopChange',async (req,res,next)=>{
    try{
        let problem=await Problem.findOne({name:req.body.name});
        problem.status='Pending';
        console.log(req.body);
        problem.duration+=parseInt(req.body.time);
        console.log(problem);
        await problem.save();
        res.send({status:'Done'});
    }
    catch(err)
    {
        next(err);
    }
})
app.post('/problemDone',async (req,res,next)=>{
    try{
        let problem=await Problem.findOne({name:req.body.name});
        problem.status="Done";
        await problem.save();
        res.send({status:"Done"});
    }
    catch(err)
    {
        next(err);
    }
})
app.get('/totalprogress',async (req,res,next)=>{
    try{
        let done=await Problem.find({status:'Done'});
        let notStarted=await Problem.find({status:'Not Started'});
        let pending=await Problem.find({status:'Pending'});
        console.log(done);
        console.log(notStarted);
        console.log(pending);
        res.send({done:done.length,notStarted:notStarted.length,pending:pending.length});
    }
    catch(err)
    {
        next(err);
    }
})
app.post('/deleteProblem',async (req,res,next)=>{
    try{
        await Problem.findByIdAndDelete(req.body.id);
        res.send({status:"Done"});
    }
    catch(err)
    {
        next(err);
    }
})
app.get('/search',async (req,res,next)=>{
    try{
        res.render('searchpage');
    }
    catch(err)
    {
        next(err);
    }
})
app.post('/search',async (req,res,next)=>{
    try{
        const problems=await Problem.find({name:req.body.name});
        res.send(problems);
    }
    catch(err)
    {
        next(err);
    }
})
app.post('/problems',async (req,res,next)=>{
    try{
        const problems=await Problem.find({date:req.body.date});
        problems.reverse();
        res.send(problems);
    }
    catch(err)
    {
        next(err);
    }
})
app.use(function (err, req, res, next) {
    res.status(err.status||500).send({status:err.status||500,error:err.message});
  })
app.listen(process.env.PORT||3000,()=>{
    console.log('Successfully connected to server');
})