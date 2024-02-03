const moment = require("moment");
const db = require("../_helpers/db");
const dbPayment = db.payment;
const smsObj = require("../_helpers/sms");

async function add(req, res) {
  var result = await dbPayment(req.body)
    .save()
  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbPayment.updateOne(
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

  var result = await dbPayment
    .deleteOne({ id: _id })
    .then(function () {
      // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
  return { data: result, responseCode: 1, responseMessage: "Deleted" };
}
async function read(req) {
  var result = await dbPayment
    .findOne({ member: req.params.id,status:"requested" });

  return { data: result };
}
async function readByUser(req) {
  var result = await dbPayment
    .find({ member: req.params.userid });
  return { data: result };
}
async function readAll(req) {
  var result = await dbPayment.find().populate(["member","upiId"]);
  return { data: result };
}


async function monthlyReport(req) {
  var fromDate = req.body.fromDate;
  var toDate = req.body.toDate;
  var rechargeSummery = '';

    if (fromDate === null || fromDate === undefined || toDate === null || toDate === undefined) {
      toDate = new Date();

      rechargeSummery = await dbPayment.aggregate([

        {
          $match: {
            status: "success" // Specify your condition here
          }
        },
        {
          $group: {
            _id: null,
            amount: { $sum: "$amount" },
          },
        },
      ]);

    }
    else {
      rechargeSummery = await dbPayment.aggregate([
        {
          $match: {
            "transactionDate": {
              $gte: moment(req.body.fromDate).endOf("day").toDate(),
              $lte: moment(req.body.toDate).endOf("day").toDate()
            }
          }
        },
        {
          $match: {
            status: "success" // Specify your condition here
          }
        },
        {
          $group: {
            _id: null,
            amount: { $sum: "$amount" },
          },
        },

      ]);

    }
    return rechargeSummery;
}
async function monthlyReport2(req) {
  var rechargeRequest = '';

      rechargeRequest = await dbPayment.aggregate([
        
        {
          $match: {
            status: "requested" // Specify your condition here
          }
        },
        {
          $group: {
            _id: null,
              count: { $sum: 1 }
          }
      }

      ]);

    
    return rechargeRequest;
  }
async function reachargeReport(req, res) {
  var result = await monthlyReport(req, res);
  return { data: result };
}
async function reachargeReport2(req, res) {
  var result = await monthlyReport2(req, res);
  return { data: result };
}

module.exports = {
  add,
  update,
  read,
  readAll,
  readByUser,
  remove,
  reachargeReport,
  reachargeReport2,
};
