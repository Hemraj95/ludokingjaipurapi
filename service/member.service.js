const moment = require("moment");
const db = require("../_helpers/db");
const dbMembers = db.members;
const dbCompany = db.company;
const smsObj = require("../_helpers/sms");
const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");


async function add(req, res) {
  var existsMatch = await dbMembers.find({ mobile: req.body.mobile });
  if (existsMatch !== null && existsMatch.length > 0) {
    return { responseCode: -1 };
  }
  //create company before member, and use companyId in member table.
  const ReferCode = otpGenerator.generate(10, {
    upperCaseAlphabets: true,
    lowerCaseAlphabets: false,
    specialChars: false,
  });
  const member = {
    email: req.body.email,
    name: req.body.name,
    mobile: req.body.mobile,
    password: req.body.password,
    memberReferCode: ReferCode,
    registerDate: req.body.registerDate,
    referCode: req.body.referCode,
    isDeleted: false
  };
var result;
  bcrypt.hash(req.body.password, 10, async function (err, hash) {
    if (err) {
      throw err;
    }
    member.password = hash;
    result = await dbMembers(member).save()
    
  });
  return { data: result, responseCode: 1, responseMessage: "success" };

  //smsObj.SendOtp(req.body.mobile);

}
async function update(req, res, next) {

  if (req.body.password.length > 0) {
    bcrypt.hash(req.body.password, 10, async function (err, hash) {
      if (err) {
        throw err;
      }
      req.body.password = hash;

      var result = await dbMembers.updateOne(
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
    var result = await dbMembers.updateOne(
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
  var existsMatch = await dbMembers.find({ mobile: req.body.mobile });
  if (existsMatch !== null && existsMatch.length > 0) {
    return { responseCode: -1 };
  }
  var result = await dbMembers.updateOne(
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

  var result = await dbMembers
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
  var result = await dbMembers
    .findOne({ _id: req.params.id }).populate("wallet")
  console.log(result);

  var outputObj = {
    name: result.name,
    mobile: result.mobile,
    address: result.address,
    id: result.id,
    email: result.email,
  };
  return { data: result };
}
async function readByUser(req) {
  var result = await dbMembers
    .find({ _id: req.params._id, isDeleted: false })
    .populate(["wallet"]);
  return { data: result };
}
async function readByUser1(req) {
  var result = await dbMembers
    .find({ _id: req.params._id, role: req.body.roleId, isDeleted: false })
  return { data: result };
}
async function readByUser2(req) {
  var result = await dbMembers
    .find({ _id: req.params._id, isDeleted: true })
    .populate("wallet");
  return { data: result };
}

async function readAll(req) {
  var result = await dbMembers.find({ isDeleted: false }).populate("wallet");;
  return { data: result };
}
async function deletedMember(req) {
  var result = await dbMembers.find({ isDeleted: true }).populate("wallet");;
  return { data: result };
}
async function readByReferalCode(req) {
  var result = await dbMembers.find({memberReferCode: req.body.memberReferCode});
  return { data: result };
}




async function monthlyReport(req) {
  var fromDate = req.body.fromDate;
  var toDate = req.body.toDate;
  var userSummery = '';

    if (fromDate === null || fromDate === undefined || toDate === null || toDate === undefined) {
      toDate = new Date();

      userSummery = await dbMembers.aggregate([

       
        {
          $group: {
              _id: null,
              count: { $sum: 1 }
          }
      }
      ]);

    }
    else {
      userSummery = await dbMembers.aggregate([
        {
          $match: {
            "date": {
              $gte: moment(req.body.fromDate).endOf("day").toDate(),
              $lte: moment(req.body.toDate).endOf("day").toDate()
            }
          }
        },
        {
          $group: {
            _id: null,
              count: { $sum: 1 }
          }
      }

      ]);

    }
    return userSummery;
}
async function userCountReport(req, res) {
  var result = await monthlyReport(req, res);
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
  readByUser2,
  userCountReport,
  readByReferalCode
};
