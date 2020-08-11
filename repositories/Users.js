const userModel=require('../models/UserModel');

const allUsers=async(params)=>{
//   return new Promise((resolve,reject)=>{
//      userModel.find().then((users)=>{
//         resolve(users)
//      }).catch(err=>{
//         resolve(err);
//      })
//   });
// this is more elegent way.
 const usersData=await userModel.find().catch(e=>{
    return e;
 });
 return usersData;
};
const createUser=(params)=>{

};

const updateUser=(params)=>{

};

const deleteUser= (params)=>{

};

module.exports={
allUsers,createUser,updateUser,deleteUser
};