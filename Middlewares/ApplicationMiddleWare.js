
const ApplicationMiddleware=(req,res,next)=>{
    console.log("inside ApplicationMiddleware ");
    next()

}
module.exports=ApplicationMiddleware