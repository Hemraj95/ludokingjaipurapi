const mongoose = require("mongoose");
const environment = require("../environment");
const defaultUserSetting = require("../models/defaultUserSetting");

mongoose.Promise = global.Promise;

mongoose
  .connect(environment.mongoDbConnectionString, {useNewUrlParser: true})
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = {
  members: require("../models/member.model"),
  admin: require("../models/admin.model"),
  role: require("../models/role.model"),
  otp: require("../models/otp.model"),
  payment: require("../models/payment"),
  feedback: require("../models/feedback.model"),
  packages: require("../models/packages.model"),
  upis: require("../models/upi"),
  wallet: require("../models/wallet"),
  withdraw: require("../models/withdraw.model"),
  game: require("../models/game.model"),
  game2: require("../models/game2.model"),
  game1F: require("../models/game1F.model"),
  game2F: require("../models/game2F.model"),
  profit: require("../models/profit"),
  orderId: require("../models/orderId.model"),
};
