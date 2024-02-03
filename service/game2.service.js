const moment = require("moment");
const db = require("../_helpers/db");
const cron = require('node-cron');
const dbGame = db.game2;
const smsObj = require("../_helpers/sms");

const task = async() => {
  //console.log('Task executed at:', new Date());
  gameTableCheck();
  //gameTableCheck1();
};
const cronExpression = '*/5 * * * * *'; // Every 30 seconds
cron.schedule(cronExpression, task);

console.log('Scheduler started. Task will run every 30 seconds.');

async function gameTableCheck(req, res) {
  var result = await dbGame.findOne({status: "created"});
  if (result !== null){
    var gameTime = result.gameDate
    const updatedDate =await new Date(gameTime.getTime() + 4 * 60000)
    if(updatedDate<new Date()){
      var result1 = await dbGame.updateOne(
        { _id: result._id },
        {status:"cancelled"},
        function (err) {
          if (err) return next(err);
        } 
      );  
    }
    else{
      //console.log("dekhlo koi aaye to verna me cancel kar dunga...")
    }
  }
  else{
    //console.log("all cleared")
  }

}
async function gameTableCheck1(req, res) {
  var result = await dbGame.findOne({status: "joined"});
  if (result !== null){
    var gameTime = result.gameDate
    const updatedDate =await new Date(gameTime.getTime() + 1 * 60000)
    if(updatedDate<new Date()){
      var result1 = await dbGame.updateOne(
        { _id: result._id },
        {status:"success"},
        function (err) {
          if (err) return next(err);
        } 
      );  
    }
    else{
      console.log("dekhlo koi aaye to verna me cancel kar dunga...")
    }
  }
  else{
    console.log("all cleared")
  }

}




async function add(req, res) {
  var result = await dbGame(req.body)
    .save()
  //smsObj.SendOtp(req.body.mobile);
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
async function readRuningGame(req) {
  var result = await dbGame
    .findOne({ player1: req.params.Userid ,status:"created" })
    .populate(['player1','player2']);
  return { data: result };
}
async function readRuningGame2(req) {
  var result = await dbGame
    .findOne({ player1: req.params.Userid ,status:"joined" })
    .populate(['player1','player2']);
  return { data: result };
}
async function readRuningGame3(req) {
  var result = await dbGame
    .findOne({ player2: req.params.Userid ,status:"joined" })
    .populate(['player1','player2']);
  return { data: result };
}
async function readRuningGame4(req) {
  var result = await dbGame
    .find({ player1: req.params.Userid ,status:"success"  })
    .populate(['player1','player2']);
  return { data: result };
}
async function readRuningGame5(req) {
  var result = await dbGame
    .find({ player2: req.params.Userid ,status:"success" })
    .populate(['player1','player2']);
  return { data: result };
}
async function readRuningGame1(req) {
  var result = await dbGame
    .findOne({ player2: req.params.Userid ,status:"created"})
    .populate(['player1','player2']);
  return { data: result };
}
async function readByUser(req) {
  var result = await dbGame
    .findOne({ status: "created",playerCount : "1",gameAmount:req.body.gameAmount})
    .populate(['player1','player2']);
  return { data: result };
}
async function readAll(req) {
  var result = await dbGame.find({ status: "created"}).populate(['player1','player2']);
  return { data: result };
}
async function readAllCancle(req) {
  var result = await dbGame.find({status :"cancelled"}).populate(["player1"]);
  return { data: result };
}
async function readAllSuccess(req) {
  var result = await dbGame.find({status :"success"}).populate(["player1","player2"]);
  return { data: result };
}

async function monthlyReport(req) {
  var fromDate = req.body.fromDate;
  var toDate = req.body.toDate;
  var successGameCount = '';

    if (fromDate === null || fromDate === undefined || toDate === null || toDate === undefined) {
      toDate = new Date();

      successGameCount = await dbGame.aggregate([

        {
          $match: {
            status: "success" // Specify your condition here
          }
        },
        {
          $group: {
              _id: null,
              count: { $sum: 1 }
          }
      }
      ]);

    }
    else {
      successGameCount = await dbGame.aggregate([
        {
          $match: {
            "date": {
              $gte: moment(req.body.fromDate).endOf("day").toDate(),
              $lte: moment(req.body.toDate).endOf("day").toDate()
            }
          }
        },
        {
          $match: {
            status: "success" // Specify your condition here
          }
        },
        {
          $group: {
            _id: null,
              count: { $sum: 1 }
          }
      }

      ]);

    }
    return successGameCount;
}
async function monthlyReport2(req) {
  var fromDate = req.body.fromDate;
  var toDate = req.body.toDate;
  var cancelGameCount = '';

    if (fromDate === null || fromDate === undefined || toDate === null || toDate === undefined) {
      toDate = new Date();

      cancelGameCount = await dbGame.aggregate([

        {
          $match: {
            status: "cancelled" // Specify your condition here
          }
        },
        {
          $group: {
              _id: null,
              count: { $sum: 1 }
          }
      }
      ]);

    }
    else {
      cancelGameCount = await dbGame.aggregate([
        {
          $match: {
            "date": {
              $gte: moment(req.body.fromDate).endOf("day").toDate(),
              $lte: moment(req.body.toDate).endOf("day").toDate()
            }
          }
        },
        {
          $match: {
            status: "cancelled" // Specify your condition here
          }
        },
        {
          $group: {
            _id: null,
              count: { $sum: 1 }
          }
      }

      ]);

    }
    return cancelGameCount;
}
async function successGameReport(req, res) {
  var result = await monthlyReport(req, res);
  return { data: result };
}
async function cancelGameReport(req, res) {
  var result = await monthlyReport2(req, res);
  return { data: result };
}





module.exports = {
  add,
  update,
  read,
  readAll,
  readByUser,
  remove,
  readRuningGame,
  readRuningGame1,
  readRuningGame2,
  readRuningGame3,
  readRuningGame4,
  readRuningGame5,
  readAllCancle,
  readAllSuccess,
  successGameReport,
  cancelGameReport
};
