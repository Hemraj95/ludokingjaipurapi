const generateOTP = require("./generateOTP");
var express = require("express");
const router = express.Router();
var db = require("./../_helpers/db");
var unirest = require("unirest");


const sendEmail = async (request, res) => {
  const { mobile } = request.body;
  console.log(mobile);

  const otp = generateOTP();

  var req = unirest("POST","https://www.fast2sms.com/dev/bulkV2");

  req.headers({
    "authorization": "OVBWKNTi6YHjUIeMAgv13xdLEXCyt5owcs8fnzJ9hD0Q4m7bZlca2Gzqi9jsVkrt0u6ZPNQpJ3ARdyIO"
  });
  
  req.form({
     
      "route":"otp",
      "variables_values":otp,
      "numbers": mobile,
  });
  var savedata = {
    mobile: mobile,
    otp: otp,
  }
  req.end(async function (res) {
    if (res.error) {
        console.log(res)
    }
      else {
      console.log(res.body);
      var existsMatch = await db.otp.find({ mobile: mobile });
      if (existsMatch !== null && existsMatch.length > 0) {
       
        await db.otp.findByIdAndUpdate(existsMatch[0]._id, savedata);
        //return { responseCode: -1 };
      }
      else{
        db.otp(savedata).save();
      }
      
    }
  });
  return { data: "otp", responseCode: 1, responseMessage: "otpupdated" };
};
async function readAll(req) {
  var result = await db.otp.find();
  return { data: result };
}

module.exports = { sendEmail,readAll };
