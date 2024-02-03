const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const DefaultUserSetting = new Schema({
  id: { type: String, unique: true, min: 1 },
  companyId: { type: Schema.Types.ObjectId, ref: 'company' },
  userId: { type: Number, required: true },
  snf: { type: Number },
  fat: { type: Number },
  dateFormate: { type: String },
  showCompanyName: { type: String },
  showUserName: { type: String },
});

DefaultUserSetting.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("DefaultUserSetting", this, next);
});

module.exports = mongoose.model("DefaultUserSetting", DefaultUserSetting);
