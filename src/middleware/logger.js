const logger=function(req,res,next){
    console.log("logger called")


//most important part
//middleaware always calls next function
//rather than giving response
next();


}

module.exports=logger;

