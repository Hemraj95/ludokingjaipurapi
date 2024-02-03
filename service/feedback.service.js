const db = require("../_helpers/db");
const dbFeedback = db.feedback;
const smsObj = require("../_helpers/sms");

async function add(req, res) {

  var result = await dbFeedback(req.body)
    .save()
  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}


async function remove(req, res, next) {
  let _id = parseInt(req.params.id);

  var result = await dbFeedback
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
  var result = await dbFeedback
    .findOne({ _id: req.params.id })
    .populate("memberId");

  return { data: result };
}

async function readAll(req) {
    var result = await dbFeedback.find().populate("memberId");
    return { data: result };
  }
  


module.exports = {
  add,
  read,
  readAll,
  remove,
};
