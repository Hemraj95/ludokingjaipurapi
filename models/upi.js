const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Upi = new Schema({
  id: { type: String, unique: true, min: 1 },
  name:{ type: String},
  status:{ type: String},
});

Upi.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("upis", this, next);
});

module.exports = mongoose.model("upis", Upi);
