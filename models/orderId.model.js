const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const OrderId = new Schema({
  id: { type: String, unique: true, min: 1 },
  orderId:{type:Number}

});

OrderId.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("orderId", this, next);
});

module.exports = mongoose.model("orderId", OrderId);
