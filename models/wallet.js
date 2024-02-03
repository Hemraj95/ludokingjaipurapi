const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Wallet = new Schema({
  id: { type: String, unique: true, min: 1 },
  member: { type: Schema.Types.ObjectId, ref: "members" },
  amount:{ type: Number},
  winningAmount:{ type: Number},
  RefralWinningAmount:{ type: Number},
  depositeAmount:{ type: Number},
  bonus:{ type: Number},      
  winningFreezAmount:{ type: Number},
  totalWinningAmount:{ type: Number},
});

Wallet.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("wallet", this, next);
});

module.exports = mongoose.model("wallet", Wallet);
