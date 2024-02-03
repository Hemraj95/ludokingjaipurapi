const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrementModelID = require("./counterModel");

const Game2 = new Schema({
  id: { type: String, unique: true, min: 1 },
  gameDate: { type: Date },
  player1: { type: Schema.Types.ObjectId, ref: "members" },
  player2: { type: Schema.Types.ObjectId, ref: "members" },
  status:{ type: String},
  player1Status:{ type: String},
  player2Status:{ type: String},
  froudStatus:{ type: Boolean},
  winner:{ type: String},
  gameAmount:{ type: Number},
  playerCount:{type:Number},
  winningAmount:{type:Number},
  roomCode:{type:String},
  debitAmount:{type:Boolean},
});

Game2.pre("save", function (next) {
  if (!this.isNew) {
    next();
    return;
  }
  autoIncrementModelID("game2", this, next);
});

module.exports = mongoose.model("game2", Game2);
