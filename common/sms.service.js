
var rn = require('random-number');
var http=require('http');

var generate_code=function(){

    var options = {
        min:  1000,
        max:  9999,
        integer: true
      };

   return  rn(options);

};

function send_sms(to_number,message,masking){
    http.get("http://sendpk.com/api/sms.php?username=923499023398&password=8396"+"&sender="+masking+"&mobile="+to_number+"&message="+message+"&format=json'", (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
           console.log("log the messsage");
           // console.log(JSON.parse(data));
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });

}
function create_message(varifcation_code){
    var message="Please  varify your mobile number by sending code:"+varifcation_code;

    return message;


}

exports.generate_code=generate_code;
exports.send_sms=send_sms;
exports.create_message=create_message;