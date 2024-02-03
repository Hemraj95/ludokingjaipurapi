const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Feedback = new Schema({
  id: { type: Number, unique: true, min: 1 },
  message: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"],
  },
  messageDate: { type: Date },

  memberId: { type: Schema.Types.ObjectId, ref: 'members' },
});

Feedback.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("feedback", this, next);
});

module.exports = mongoose.model("feedback", Feedback);
