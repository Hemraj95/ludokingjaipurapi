const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Withdraw = new Schema({
  id: { type: String, unique: true, min: 1 },
  userId: { type: Number, required: true },
  member: { type: Schema.Types.ObjectId, ref: "members" },
  amount:{ type: Number},
  upi:{ type: String},
  status:{ type: String},
  transactionDate: { type: Date },

});

Withdraw.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("withdraw", this, next);
});

module.exports = mongoose.model("withdraw", Withdraw);
