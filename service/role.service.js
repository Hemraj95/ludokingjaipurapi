const db = require("../_helpers/db");
const dbRole = db.role;

async function add(req, res) {
  var existsMatch = await dbRole.find({ mobile: req.body.name });
  if (existsMatch !== null && existsMatch.length > 0) {
    return { responseCode: -1 };
  }

  var result = await dbRole(req.body).save();

  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbRole.updateOne(
    { id: req.params.id },
    req.body,
    function (err) {
      if (err) return next(err);
    }
  );
  return { data: result, responseCode: 1, responseMessage: "Updated" };
}

async function remove(req, res, next) {
  let _id = parseInt(req.params.id);

  var result = await dbRole
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
  var result = await dbRole.findOne({ id: req.params.id });
  return { data: result };
}
async function readByState(req) {
  
  var result = await dbRole.find({ stateId: req.params.stateId });
  return { data: result };
}
async function readAll(req) {
  var result = await dbRole.find();
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
