const moment = require("moment");
const db = require("../_helpers/db");
const dbWithdraw = db.withdraw;

async function add(req, res) {
  var result = await dbWithdraw(req.body).save();

  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbWithdraw.updateOne(
    { _id: req.params.id },
    req.body,
    function (err) {
      if (err) return next(err);
    }
  );
  return { data: result, responseCode: 1, responseMessage: "Updated" };
}
async function read(req) {
  var result = await dbWithdraw.findOne({ member: req.params.id });
  return { data: result };
}

async function readAll(req) {
  var result = await dbWithdraw.find().populate('member');
  return { data: result };
}
async function readByUser(req) {
  var result = await dbWithdraw
    .find({ member: req.params.userid });
  return { data: result };
}
async function monthlyReport(req) {
  var fromDate = req.body.fromDate;
  var toDate = req.body.toDate;
  var milkSummary = '';

    if (fromDate === null || fromDate === undefined || toDate === null || toDate === undefined) {
      toDate = new Date();

      milkSummary = await dbWithdraw.aggregate([

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
      milkSummary = await dbWithdraw.aggregate([
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
    return milkSummary;
}
async function monthlyReport2(req) {
  var withdrawRequest = '';

      withdrawRequest = await dbWithdraw.aggregate([
        
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

    
    return withdrawRequest;
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
  reachargeReport,
  reachargeReport2,
  readByUser,
};
