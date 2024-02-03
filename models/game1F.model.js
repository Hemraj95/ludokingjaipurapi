const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Game1F = new Schema({
  id: { type: String, unique: true, min: 1 },
  gameFDate: { type: Date },
  player1: { type: Schema.Types.ObjectId, ref: "members" },
  player2: { type: Schema.Types.ObjectId, ref: "members" },
  game: { type: Schema.Types.ObjectId, ref: "game" },
  status:{ type: String},
  reporter:{ type: Schema.Types.ObjectId, ref: "members" },
  gameAmount:{ type: Number},
  winningAmount:{type:Number},
  roomCode:{type:Number},
  image:{type:String},
});

Game1F.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("game1F", this, next);
});

module.exports = mongoose.model("game1F", Game1F);
