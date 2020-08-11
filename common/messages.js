const success = (res, data) => {
    return res.status(200).send({
        code : "200",
        success :true,
        data : data,
        
    });
};

const created = (res, data) => {
    return res.status(201).send({
        code : "201",
        success : true,
        data : data
        
    });
};

const notFound = (res) => {
    return res.status(404).send({
        code : "404",
        success :false
       
    });

};
const fail=(res,error)=>{
    return res.status(404).send({
        code : "500",
        success :false,
        error:error
       
    });
};
const remove=(res)=>{
    return res.status(404).send({
        code : "200",
        success :true,
        message:"Item is deleted sucessfully"
       
    });
};
const customSuccess = (res, data) => {
    data.code="200";
    data.success=true;

    return res.status(200).send(data);
};
module.exports={
    created,success,fail,notFound,remove,customSuccess
}