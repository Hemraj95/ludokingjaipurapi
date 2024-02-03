const db = require("../_helpers/db");
const dbWallet = db.wallet;

async function add(req, res) {
  var result = await dbWallet(req.body).save().then(d => {
    return db.members.findByIdAndUpdate(
      req.body.member,
      { $push: { wallet: d._id } },
      { new: true, useFindAndModify: false }
    );
  });

  //smsObj.SendOtp(req.body.mobile);
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbWallet.updateOne(
    { member: req.params.id },
    req.body,
    function (err) {
      if (err) return next(err);
    }
  );
  return { data: result, responseCode: 1, responseMessage: "Updated" };
}
async function read(req) {
  var result = await dbWallet.findOne({ member: req.params.id });
  return { data: result };
}

async function readAll(req) {
  var result = await dbWallet.find();
  return { data: result };
}

module.exports = {
  add,
  update,
  read,
  readAll,
};
