const expressAsyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const generateOTP = require("./generateOTP");
dotenv.config();
var express = require("express");
const router = express.Router();
var db = require("./../_helpers/db");


let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "callbackcoding08@gmail.com",
    pass: "lzwrknuwnbqgojbn",
  },
});

const sendEmail = expressAsyncHandler(async (req, res) => {
  const { email } = req.body;
  console.log(email);

  const otp = generateOTP();

  var mailOptions = {
    from: "callbackcoding08@gmail.com",
    to: email,
    subject: "OTP form Milkvan",
    text: `Your OTP is: ${otp}`,
  };
  var savedata = {
    email: email,
    otp: otp,
  }

  transporter.sendMail(mailOptions, async function  (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent successfully!");
      var existsMatch = await db.otp.find({ email: email });
      if (existsMatch !== null && existsMatch.length > 0) {
       
        await db.otp.findByIdAndUpdate(existsMatch[0]._id, savedata);
        //return { responseCode: -1 };
      }
      else{
        db.otp(savedata).save();
      }
      
    }
  });
  return { data: "otp", responseCode: 1, responseMessage: 1 };
});
async function readAll(req) {
  var result = await db.otp.find();
  return { data: result };
}

module.exports = { sendEmail,readAll };
