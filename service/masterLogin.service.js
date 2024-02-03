const db = require("../_helpers/db");
const dbAdmin = db.admin;
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = "asdf_orbit_orbot"
  
const TOKEN_HEADER_KEY = "fdsa_orbit_orbot"

async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

async function validate(req, res) {
  var result = await dbAdmin.findOne({
    mobile: req.body.mobile
  });

  var dbpwd = result.password;
  var returnResponse = {};
  var isValid = await comparePassword(req.body.password,dbpwd);
  result.password= '';
  let data = {
    address:result.address,
    email:result.email,
    id:result.id,
    mobile:result.mobile,
    _id:result._id,
    name:result.name,
    registerDate:result.registerDate,
    password:"",
}
  let jwtSecretKey =JWT_SECRET_KEY;
  const token = jwt.sign(data, jwtSecretKey);
  
  if (isValid) {
    if(result.isDeleted===false){
      return {
        responseCode: 1,
        responseMessage: "success",
        auth: token,
      };
    }
    else{
      return {
        responseCode: -2,
        responseMessage: "Deleted",
        auth: null,
      };
    }
   
  } else {
    return {
      responseCode: -1,
      responseMessage: "Member Not Found",
      auth: null,
    };
  }
}

async function readByMobile(req, res) {
  var result = await dbAdmin.findOne({
    mobile: req.body.mobile,
  }).populate(['role', 'member', 'companyId']);
  if (result) { 
    let data1 = {
      address:result.address,
      email:result.email,
      id:result.id,
      mobile:result.mobile,
      _id:result._id,
      name:result.name,
      route:result.route,
      registerDate:result.registerDate,
      password:"",
  }
    let jwtSecretKey =JWT_SECRET_KEY;
    const token = jwt.sign(data1, jwtSecretKey);
    return {
      responseCode: 1,
      responseMessage: "success",
      auth: token,
    };
  } else {
    return {
      responseCode: -1,
      responseMessage: "Member Not Found",

    };
  }
}
module.exports = {
  validate,
  readByMobile,
};
