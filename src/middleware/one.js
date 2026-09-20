const one=function(req,res,next){
    console.log("one called")


//most important part
//middleaware always calls next function
//rather than giving response
next();


}

module.exports=one;
