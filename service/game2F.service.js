const db = require("../_helpers/db");
const dbGame = db.game2F;
const smsObj = require("../_helpers/sms");

async function add(req, res) {
  console.log("hyy")
  var result = await dbGame(req.body).save()
  //smsObj.SendOtp(req.body.mobile);
  console.log("result",result)
  return { data: result, responseCode: 1, responseMessage: "success" };
}
async function update(req, res, next) {
  var result = await dbGame.updateOne(
    { _id: req.params.id },
    req.body,
    function (err) {
      if (err) return next(err);
    }
  );
  return { data: result, responseCode: 1, responseMessage: "Updated" };
}

async function remove(req, res, next) {
  let _id = parseInt(req.params.id);

  var result = await dbGame
    .deleteOne({ id: _id })
    .then(function () {
      // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
  return { data: result, responseCode: 1, responseMessage: "Deleted" };
}
async function read(req) {
  var result = await dbGame
    .findOne({ _id: req.params.id })
    .populate(['player1','player2']);

  return { data: result };
}

async function readAll(req) {
  var result = await dbGame.find().populate(["player1","player2"]);
  return { data: result };
}
async function readAllCancle(req) {
  var result = await dbGame.find({status :"unsolved"}).populate(["player1","player2","game","reporter"]);
  return { data: result };
}
async function readAllSuccess(req) {
  var result = await dbGame.find({status :"solved"}).populate(["player1","player2"]);
  return { data: result };
}
async function monthlyReport(req) {
 
  var unsolvedGame = '';

 
      unsolvedGame = await dbGame.aggregate([

        {
          $match: {
            status: "unsolved" // Specify your condition here
          }
        },
        {
          $group: {
            _id: null,
              count: { $sum: 1 }
          }
      }

      ]);
    return unsolvedGame;
}
async function unsolvedGame(req, res) {
  var result = await monthlyReport(req, res);
  return { data: result };
}
module.exports = {
  add,
  update,
  read,
  readAll,
  remove,
  readAllCancle,
  readAllSuccess,
  unsolvedGame,
};
