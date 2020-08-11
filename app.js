//  app.js server file handling endpoint requests
const chalk=require('chalk');
const path=require('path');
const auth=require('./middleware/auth');
const config = require('./config/index');
const url = require('url');
var express=require('express');

var app=express();
var cors=require('cors');

app.use(cors({credentials: true, origin: true}));

// //const logger = require('morgan');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
//let localConnection="mongodb://127.0.0.1:27017/?compressors=zlib&gssapiServiceName=mongodb/local";
let localConnection="mongodb://127.0.0.1:27017/whipp_db";
let remoteConnection="mongodb+srv://israrulhaq:Computer2020@clusto0.mut68.azure.mongodb.net/whipp_db?retryWrites=true&w=majority";
mongoose.connect(localConnection, {
  useNewUrlParser: "true",
});

//
var connected = chalk.bold.cyan;
var error = chalk.bold.yellow;
var disconnected = chalk.bold.red;
var termination = chalk.bold.magenta;
mongoose.connection.on("error", err => {
  console.log(error("err occured in connect to db"));
});
mongoose.connection.on("connected", (err, res) => {
  console.log(connected("mongoose is connected"));
});

const { needsAuth } = require('./middleware/auth');
const jwt = require('./utils/jwt');
 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Routes
const stripeCouponsRoutes=require('./Routes/strapi_couponsRoutes')();
const authRoutes=require('./Routes/authRoute')();

app.use("/api/stripe/coupons",stripeCouponsRoutes);
app.use("/api/user",authRoutes);

const port=process.env.PORT||8080;

app.get('/',function(req,res) {
    res.send("Welcome to the strip apis ");
});
app.listen(port,function () {
    console.log("strip  restfull api are running on port:"+port);

});