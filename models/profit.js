const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Profit = new Schema({
  id: { type: String, unique: true, min: 1 },
  amount:{ type: Number},
  date:{type:Date}
});

Profit.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("profit", this, next);
});

module.exports = mongoose.model("profit", Profit);
