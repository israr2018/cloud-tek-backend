// Languages Routes handler

var express = require("express");

const stripeCouponsRepo=require('../repositories/stripeCouponsRepo');
const validators=require('../common/joiValidator');
const messages=require('../common/messages');

var routes=function(){
    const router = express.Router();

    router.route('/').post(async function(req,res){
      
            let data= await stripeCouponsRepo.create(req.body).catch(e=>{
                messages.fail(res,error,'');
            });
           
            console.log("data:"+JSON.stringify(data));
            messages.created(res,data,"success");
    });
 
    router.route('/').get(async function(req,res){
       
       let data= await stripeCouponsRepo.all().catch(e=>{
            messages.fail(res,e);
        });
       
       messages.success(res,data);
    });
    router.route('/').put(async function(req,res){
        let payload={};
        let coupon_id=req.body.id;
        let params={};
        params.name=req.body.name;
        params.percent_off=req.body.percent_off;
        payload["metadata"]=params;
        
         let data=await stripeCouponsRepo.update(coupon_id,payload).catch(e=>{
             messages.fail(res,error);

         })
         messages.success(res,data);
    });
    router.route('/:_id').get(async function(req,res){
        if (req.params._id){
             let param={_id:req.params._id};
             let data= await languagesRepo.findById(param).catch(e=>{
                messages.fail(res,e);
             });
             messages.success(res,data);

        }
        messages.fail(res,"Invalid  Parameters");
    });
    router.route('/:_id').delete(async function(req,res){
      
        if (req.params._id){
            
            let data= await stripeCouponsRepo.remove(req.params._id).catch(e=>{
                console.log("error:"+e);
                 messages.fail(res,e);
            });
           // console.log("data:"+JSON.stringify(data));
            if(data.deleted)
            {
             messages.remove(res);
             
            }
             else{
                 
                 messages.fail(res,"coulde not deleted ");
             }
             
       }
       else{
        messages.fail(res,"Invalid  Parameters");
       }
       
    });
    return router;
}
module.exports=routes;