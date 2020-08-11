const config = {
    port:process.env.PORT || 4000,
    ACAO:"",
    database: {
      debug: true,
     // connection:'mongodb://israr.mcz:Computer2018@ds157223.mlab.com:57223/mcz_db'
      connection:'mongodb+srv://israr2:Computer2020@cluster0-akuxt.mongodb.net/whip_db?retryWrites=true&w=majority'
    },
    logger: {
      level: "debug",
      format: 'combined'
    },
   
  };
  
  module.exports = config;