
const _=require('lodash');
const jwt=require('../utils/jwt');

  function  needsAuth(req,res,next){
    // console.log("one");
    // console.log("req=>"+JSON.stringify(req.headers));
    
    if(_.isEmpty(_.get(req.headers,"api_key"))){
        
        return  res.status(403).send("Unathorized Access");
    }
    let api_key=_.get(req.headers,"api_key");
    console.log("api_key:"+api_key);
    varifyAuth(api_key).then((token)=>{
            console.log("token:"+JSON.stringify(token));
            // let userObject=jwt.decodeToken(token);
            // console.log("userObject=>"+JSON.stringify(userObject));
            refresh(token).then( (refreshedToken)=>{
            
                res.setHeader("api_key",refreshedToken);
                console.log("api_key=>"+refreshedToken);
                next();
            }).catch( err1=>{
                console.log("err1:"+err1);
                return res.status(403).send("Invalid Token2");
            });
        })
       
    .catch((err)=>{
        console.log("err=>"+err);
        return res.status(403).send("Invalid Token");
    });
   
}
 function varifyAuth(auth){
    // jwt.varify(auth).then((token)=>{
    // const newtoken= jwt.refresh(auth);
    // return newtoken;
    // }).catch(err=>{
    // return err;
    // });
    return jwt.varify(auth);

}
function refresh(token){
    return jwt.refresh(token);
}

module.exports={needsAuth,varifyAuth};