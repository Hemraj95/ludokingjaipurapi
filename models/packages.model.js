const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Package = new Schema({
  id: { type: String, unique: true, min: 1 },
  packageValue:{ type: Number},
  duration:{ type: String},
  transactionDate: { type: Date },

});

Package.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("package", this, next);
});

module.exports = mongoose.model("package", Package);
