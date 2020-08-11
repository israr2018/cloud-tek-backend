const Joi=require('@hapi/joi');

const validateUserPayload=(payload)=>{

let schema=Joi.object({

email:Joi.string().required().messages({
    'string.base':'Invalid type, user name must be type',
    'string.empty':'Please enter your email'
}),
password:Joi.string().required()
   
});
const {error,value}= schema.validate(payload);
let validationOutput={};

validationOutput.value=value;
let errorDetails='';
if(error && error.details && error.details.length>0){
    validationOutput.error=errorHelper(error.details);
}

return validationOutput;
};
const errorHelper=(details)=> {
    let errorDetails='';
    details.forEach(element=>{
        errorDetails=element.message+' ';
    });
    return errorDetails;
};
const validateLanguagePayload=(payload)=>{
    
    let schema=Joi.object({
        _id:Joi.string(),
        lang_name:Joi.string().required(),
   
        lang_code:Joi.string().required(),
        lang_is_rtl:Joi.boolean().required(),
        lang_status:Joi.boolean().required()
       
    });
    const {error,value}= schema.validate(payload);
    let validationOutput={};
    
    validationOutput.value=value;
    let errorDetails='';
    if(error && error.details && error.details.length>0){
        validationOutput.error=errorHelper(error.details);
    }
    
    return validationOutput;
    };
    
module.exports={validateUserPayload, validateLanguagePayload};