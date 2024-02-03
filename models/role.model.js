const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Role = new Schema({
  id: { type: Number, unique: true, min: 1 },
  name: {
    type: String,
    required: true,
    max: [127, "Max Length is 127 characters"],
  },

});

Role.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("role", this, next);
});

module.exports = mongoose.model("role", Role);
