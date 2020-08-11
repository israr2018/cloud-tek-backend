
//   get express
const express = require('express');
const encription=require('../utils/encription');

const userRepository = require('../repositories/userRepository');
const { response } = require('express');
const messages=require('../common/messages');

const routes = function () {
    var authRouter = express.Router();
   
    authRouter.post("/", async function (req, res) {
      
        encription.encriptPassword(req.body.password).then( async(hashed_password)=>{
            console.log("hashedPassword:"+hashed_password);
            const payload={
                email:req.body.email,
                password:hashed_password,
                user_role:req.body.user_role
            };
            let newUser=await userRepository.create(payload).catch(err=>{
                return messages.fail(res,err);
            });
            if(!newUser){
                return messages.fail(res,"User Could not Created");
             }
             return messages.success(res,"User Created successfully.");

        })
        .catch(err=>{
            return messages.fail(res, "Password Encription Error.");
        });
        
    });
    // Post Method , authenticate user and send token along 
    // payLoad{user_email,user_role}

    authRouter.post("/token", async function (req, res) {
        console.log("user/token endpoint");
        const email=req.body.email;
        const password = req.body.password;
        var query={};
        query.email=req.body.email;
     let result=  await userRepository.findByName({email:email}).catch((err)=>{
         console.log("error in getting the record"+err);
         return messages.fail(res,err);
     });
     if(!result){
         messages.notFound(res);
     }
     if(utils.encription.checkPassword(password,result.password)){
         return  messages.fail(res,"Invalid Password");
     }
     console.log("result=>"+JSON.stringify(result));
     const payload={
         email:req.body.email,
         password:result.password,
         user_role:result.user_role
     }
     jwt.sign(payload).then((token)=>{
       return messages.success(res,{access_token:token});
     })
     .catch((err)=>{
         console.log("error:"+err);
        return messages.fail(res,err);
     })
    });
    // update , user , password 
    // user  send ,email and password
    authRouter.put("/",async function(req,res){

        const email=req.body.email;
        const old_password=req.body.old_password;
        const new_password=req.body.new_password;
        const result =await userRepository.findByName({email:email}).catch((err)=>{
            return messages.fail(res,err);
        });
        // chekc if the user exists
        if(!result){
            return messages.fail(res,"Invalid email");
        }
        //check if the old password  exist
        if(!encription.checkPassword(old_password,result.password)){
            return messages.success(res,"Invalid Password");
        }
        
        // update the old passworld
        encription.encriptPassword(new_password).then(async(hashed_password)=>{
            result.password=hashed_password;
          let user= await  userRepository.update(result).catch((updateError)=>{
              return messages.fail(res,"Password could not updated");
          });
          return messages.success(res,"Password Updated  Successfully.");
        })
        .catch(err=>{
            return messages.fail(res,"Password Encription Error");
        })
     
    });
    
    return authRouter;
};

module.exports = routes;