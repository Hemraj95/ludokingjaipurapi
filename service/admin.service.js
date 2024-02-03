const db = require("../_helpers/db");
const dbAdmin = db.admin;
const smsObj = require("../_helpers/sms");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");



async function add(req, res) {
  var existsMatch = await dbAdmin.find({ mobile: req.body.mobile });
  if (existsMatch !== null && existsMatch.length > 0) {
    return { responseCode: -1 };
  }
  const member = {
    email: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
    password: req.body.password,
    role: req.body.role,
    registerDate:req.body.registerDate,
    isDeleted:false
  };
  var result;
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    if (err) {
      throw err;
    }
    member.password = hash;
    result = await dbAdmin(member).save();
  });
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {

  if (req.body.password.length > 0) {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      if (err) {
        throw err;
      }
      req.body.password = hash;

      var result = await dbAdmin.updateOne(
        { _id: req.params.id },
        req.body,
        function (err) {
          if (err) return next(err);
        }
      );
      return { data: result, responseCode: 1, responseMessage: "Updated" };
    });
    return { data: result, responseCode: 1, responseMessage: "Updated" };
  } else {
    var result = await dbAdmin.updateOne(
      { _id: req.params.id },
      req.body,
      function (err) {
        if (err) return next(err);
      }
    );
    return { data: result, responseCode: 1, responseMessage: "Updated" };
  }
}
async function update1(req, res, next) {
  var existsMatch = await dbAdmin.find({ mobile: req.body.mobile });
  if (existsMatch !== null && existsMatch.length > 0) {
    return { responseCode: -1 };
  }
  var result = await dbAdmin.updateOne(
    { _id: req.params.id },
    req.body,
    function (err) {
      if (err) return next(err);
    }
  );
  return { data: result, responseCode: 1, responseMessage: "Updated" };
}

async function remove(req, res, next) {
  let _id = parseInt(req.params.id);

  var result = await dbAdmin
    .deleteOne({ id: _id })
    .then(function () {
      // Success
    })
    .catch(function (error) {
    });
  return { data: result, responseCode: 1, responseMessage: "Deleted" };
}
async function read(req) {
  console.log(req.params.id);
  var result = await dbAdmin
    .findOne({ _id: req.params.id })
  console.log(result);

  var outputObj = {
    name: result.name,
    mobile: result.mobile,
    address: result.address,
    id: result.id,
    email: result.email,
  };
  return { data: outputObj };
}
async function readByUser(req) {
  var result = await dbAdmin
    .find({ _id: req.params._id,isDeleted:false })
    .populate(["companyId","role"]);
  return { data: result };
}
async function readByUser1(req) {
  var result = await dbAdmin
    .find({_id: req.params._id,role:req.body.roleId,isDeleted:false })
  return { data: result };
}
async function readByUser2(req) {
  var result = await dbAdmin
    .find({ _id: req.params._id,isDeleted:true })
    .populate("role");
  return { data: result };
}

async function readAll(req) {
  var result = await dbAdmin.find();
  return { data: result };
}
async function deletedMember(req) {
  var result = await dbAdmin.find();
  return { data: result };
}

module.exports = {
  add,
  update,
  update1,
  read,
  readAll,
  deletedMember,
  remove,
  readByUser,
  readByUser1,
  readByUser2
};
