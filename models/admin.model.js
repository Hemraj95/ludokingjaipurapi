const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Admin = new Schema({
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
  isDeleted: { type: Boolean },

  role: { type: String },
});

Admin.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("admin", this, next);
});

module.exports = mongoose.model("admin", Admin);
