const jwt=require('jsonwebtoken');
const _=require('lodash');

exports.sign=function (payload,options){
    // jwt.sign(payload,key,options,function(err,token){
    //     if(err)
    //     console.log("err"+error);
    // })
    return new Promise((resolve,reject)=>{
        jwt.sign(payload,"test",(err,token)=>{
            if(err)
            reject(err);
            else
            resolve(token);
        })
    });

}
 exports.varify=function(token) {
    return new Promise((resolve, reject) => {
      if (token && token !== 'null') {
        jwt.verify(token, "test", (err, decoded) => {
          if (err) {
            reject(err);
          } else {
             // refresh(decoded);
            resolve(decoded);
          }

        });
      } else {
        reject('token not found.');
      }
    });
  }
 
 exports.decodeToken=function (token){
    // return new PromiseB((resolve, reject) => {
    //     const decoded = jwt.decode(token);
    //     if (decoded) {
    //       resolve(decoded);
    //     } else {
    //       reject('invalid token');
    //     }
    //   });

    const decoded=jwt.decode(token);
    console.log("decoded:"+decoded);
    if(decoded){
        return decoded;
    }
    else
    return 'invalid token';
}

 exports.refresh=function(token){
    // const decoded: any = jwt.decode(token);

    // if (_.has(decoded, 'iat')) {
    //   delete decoded.iat;
    // }
  
    // return sign(decoded, key);
    if(_.has(token,'iat')){
        delete token.iat;
    }
    let key="test";
    return sign(token,key);
}
