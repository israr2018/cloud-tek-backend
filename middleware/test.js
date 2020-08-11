const test=(req,res,next)=>{
    console.log("test")
    req.next();
}
module.exports=test;