const express = require('express');
const logger=require('./middleware/logger')
const hellomiddleware=require('./middleware/hellomiddleware')
const one=require('./middleware/one')
const two=require('./middleware/two')
const three=require('./middleware/three')
const app = express()

//sepecify the format will be in json
app.use(express.json())
app.use(express.static('public'))
const port = 3000

//connect the mongo db database
const mongoose=require('mongoose')
require('dotenv').config()

//importing user schema
const User= require('./models/users')

//delete
app.delete('/delete/user',async(req,res,next)=>{
try{
//delete user 
console.log(req.query.id)
const user=await User.findByIdAndDelete(req.query.id); //find all users in database
res.status(201).json({
    "sucess":true,
     data:user
})
}
catch(error)
{
res.status(400).json({
    "sucess":false,
     "error":error.message
})
}

})



//read
app.get('/read/user',async(req,res,next)=>{
try{
//read a user 
const user=await User.find(); //find all users in database
res.status(201).json({
    "sucess":true,
     data:user
})
}
catch(error)
{
res.status(400).json({
    "sucess":false,
     "error":error.message
})
}

})

//make a route
app.post('/create/user',async(req,res,next)=>{
try{
//create a user
const user=await User.create(req.body); //save user in datatbase
res.status(201).json({
    "sucess":true,
     data:user
})
}
catch(error)
{
res.status(400).json({
    "sucess":false,
     "error":error.message
})
}

})

//connection
const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI);
        console.log("mongo db database connected sucessfully")
    }
    catch (error){
        console.error("error while connecting",error)
        process.exit(1);
    }
}

//for calling middleware we use app.use
app.use(logger); //global middleware

app.get('/',one,two,three,(req,res)=>{
    res.send('Hello World!')
})

app.get('/',(req, res) => {
    res.send('Hello World!')
})

//making our first request
app.get("/hello",hellomiddleware,(req,res)=>{
    console.log("header value:,",req.headers.myheader)
 //response
    console.log("params value:,",req.query.myparams)
 res.status(200).json({
    "message":"hello"
 })
})

app.get("/Reshika",(req,res)=>{
 //response
 res.status(201).json({
    "name":"Reshika"
 })
})

//endpoint post to get body
app.post("/data",(req,res)=>{
    console.log(req.body)
res.status(200).json({
    "message":"sucess"
})
})

//implementing middleware

connectDB().then(()=>{
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
})