const three=function(req,res,next){
    console.log("three called")


//most important part
//middleaware always calls next function
//rather than giving response
next();


}

module.exports=three;
