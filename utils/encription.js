
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bcrypt = require('bcryptjs');

 exports.encriptPassword=function(password){
    let saltRounds=10;
    //const saltRounds = await bcrypt.genSalt(10);
  return bcrypt.hash(password,saltRounds);
}
exports.checkPassword=function (password,hashedPassword){
    
    return bcrypt.compareSync(password,hashedPassword);
}
