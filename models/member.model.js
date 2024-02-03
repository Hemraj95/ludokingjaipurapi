const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Member = new Schema({
  id: { type: Number, unique: true, min: 1 },
  name: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"],       
  },
  mobile: { type: String, unique: true, max: [10] },
  email: { type: String },
  registerDate: { type: Date },
  password: { type: String },
  memberReferCode: { type: String },
 referCode: { type: String },
  isDeleted: { type: Boolean },
  wallet: { type: Schema.Types.ObjectId, ref: "wallet" },

});

Member.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("members", this, next);
});

module.exports = mongoose.model("members", Member);
