const hellomiddleware=function(req,res,next){
    console.log("hellomiddleware called")


//most important part
//middleaware always calls next function
//rather than giving response
next();


}

module.exports=hellomiddleware;