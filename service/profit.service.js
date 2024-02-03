const moment = require("moment");
const db = require("../_helpers/db");
const dbProfit = db.profit;

async function add(req, res) {
  var result = await dbProfit(req.body).save();

  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbProfit.updateOne(
    { member: req.params.id },
    req.body,
    function (err) {
      if (err) return next(err);
    }
  );
  return { data: result, responseCode: 1, responseMessage: "Updated" };
}
async function read(req) {
  var result = await dbProfit.findOne({ member: req.params.id });
  return { data: result };
}

async function readAll(req) {
  var result = await dbProfit.find();
  return { data: result };
}


async function monthlyReport(req) {
  var fromDate = req.body.fromDate;
  var toDate = req.body.toDate;
  var profitSummery = '';

    if (fromDate === null || fromDate === undefined || toDate === null || toDate === undefined) {
      toDate = new Date();

      profitSummery = await dbProfit.aggregate([

       
        {
          $group: {
            _id: null,
            amount: { $sum: "$amount" },
          },
        },
      ]);

    }
    else {
      profitSummery = await dbProfit.aggregate([
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
            amount: { $sum: "$amount" },
          },
        },

      ]);

    }
    return profitSummery;
}
async function profitReport(req, res) {
  var result = await monthlyReport(req, res);
  return { data: result };
}






module.exports = {
  add,
  update,
  read,
  readAll,
  profitReport,
};
