const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Payment = new Schema({
  id: { type: String, unique: true, min: 1 },
  userId: { type: Number, required: true },
  transactionDate: { type: Date },
  member: { type: Schema.Types.ObjectId, ref: "members" },
  upiId: { type: Schema.Types.ObjectId, ref: "upis" },
  amount:{ type: Number},
 
  status:{ type: String},
  utr:{type:String}
}); 


Payment.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("payment", this, next);
});

module.exports = mongoose.model("payment", Payment);
