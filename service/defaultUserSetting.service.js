const db= require("../_helpers/db");
const dbDefaultUserSetting = db.defaultUserSetting;


async function add(req, res) {
    var existsMatch = await dbDefaultUserSetting.find();
    // if (existsMatch !== null && existsMatch.length > 0) {
    //   return { responseCode: -1 };
    // }
  
    var result = await dbDefaultUserSetting(req.body).save().then(d => {
      return comp = db.company.findByIdAndUpdate(
        req.body.companyId,
        { $push: { DefaultUserSetting: d._id } },
        { new: true, useFindAndModify: false }
      )});
  
    //smsObj.SendOtp(req.body.mobile);
    return { data: result, responseCode: 1, responseMessage: "success" };
  }
  async function update(req, res, next) {
    var result = await dbDefaultUserSetting.updateOne(
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
  
    var result = await dbDefaultUserSetting
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
    var result = await dbDefaultUserSetting.findOne({ id: req.params.id }).populate('companyId');
    return { data: result };
  }
  async function readByState(req) {
    
    var result = await dbDefaultUserSetting.find({ stateId: req.params.stateId }).populate('companyId');
    return { data: result };
  }
  async function readAll(req) {
    var result = await dbDefaultUserSetting.find().populate('companyId');
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