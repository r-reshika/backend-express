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


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})