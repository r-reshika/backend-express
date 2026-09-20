const two=function(req,res,next){
    console.log("two called")


//most important part
//middleaware always calls next function
//rather than giving response
next();


}

module.exports=two;
