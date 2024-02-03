const db = require("../_helpers/db");
const dbUpi = db.upis;

async function add(req, res) {
  var existsMatch = await dbUpi.find({ name: req.body.name });
  if (existsMatch !== null && existsMatch.length > 0) {
    return { responseCode: -1 };
  }

  var result = await dbUpi(req.body).save();

  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbUpi.updateOne(
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

  var result = await dbUpi
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
  var result = await dbUpi.findOne({ id: req.params.id });
  return { data: result };
}
async function readByState(req) {
  
  var result = await dbUpi.find({ status: "activate" });
  return { data: result };
}
async function readAll(req) {
  var result = await dbUpi.find();
  return { data: result };
}

module.exports = {
  add,
  update,
  read,
  readAll,
  remove,
  readByState
};
