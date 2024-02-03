const moment = require("moment");
const db = require("../_helpers/db");
const dbOrderId = db.orderId;
const smsObj = require("../_helpers/sms");

async function add(req, res) {
  var result = await dbOrderId(req.body)
    .save()
  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbOrderId.updateOne(
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

  var result = await dbOrderId
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
  var result = await dbOrderId
    .findOne({ _id: req.params.id })
    .populate();

  return { data: result };
}

async function readAll(req) {
  var result = await dbOrderId.find();
  return { data: result };
}




module.exports = {
  add,
  update,
  read,
  readAll,

  remove,
  
};
