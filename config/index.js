//const dotenv=require('dotenv');
//var _ = require("lodash");
const defaults =require("./env/defaults");
const node_env=(process.env.NODE_ENV||'development').trim();
// //var dev=(process.env.NODE_ENV||'development');

const config = require('./env/'+node_env);
module.exports=config;