const model=require('../models/UserModel');

const all=async()=>{

 const laguagesData=await model.find().catch(e=>{
    return e;
 });
 
 return laguagesData;
};
const create=async(payload)=>{
    const laguagesData=await model.create(payload).catch(e=>{
        return e;
     });
     return laguagesData;
};

const update=async(payload)=>{
    
    let doc=await model.findOne({_id:payload._id}).catch(e=>{
        return e;
    });
    
    doc.lang_name=payload.lang_name;
    doc.lang_code=payload.lang_code;
    doc.lang_is_rtl=payload.lang_is_rtl;
    doc.lang_status=payload.lang_status;

    let updatedDoc=await doc.save().catch(e2=>{
        return2
    });
    return updatedDoc;
};

const remove=async(params)=>{

    let docId=await model.deleteOne(params).catch(e=>{
        return e;
    });
    return docId;
};
const findByName=async (params)=>{
   let data=  await model.findOne(params).catch(e=>{
        return e;
     })
     return data;
};

module.exports={all,create,update,remove,findByName};