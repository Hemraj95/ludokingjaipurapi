var request = require("request");
const db = require("../_helpers/db");
const express = require("express");

 

function SendOtp(mobile) {
   

    const OTP = Math.floor(000000 + Math.random() * 999999);
    console.log(OTP)

  var options = {
    method: "GET",
    url: "https://api.authkey.io/request",
    qs: {
      authkey: "14f46e8842e516f7",
      sms:  `Use ${OTP} as your OTP to access your {#company#}, OTP is confidential and valid for {#time#}`,
      mobile:`${mobile}`,
      sender: "AUTHKY",
      template: "Authkey otp message"
      
    },
    

  };
 console.log(options)

  request(options, function (error, response, body) {
    if (error) {
      console.log("error sms");
      console.log(error);
    }

    console.log(body);
   

  });

  //2. save mobilenumber and otp in smslog table
}

module.exports = {
  SendOtp,
};
