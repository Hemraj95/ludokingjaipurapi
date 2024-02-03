const express = require("express");
const router = express.Router();
const gameService = require("../service/game.service");

router.get("/:id", read);
router.get("/runing/:Userid", readRuningGame);
router.get("/runing1/:Userid", readRuningGame1);
router.get("/runing2/:Userid", readRuningGame2);
router.get("/runing3/:Userid", readRuningGame3);
router.get("/runing4/:Userid", readRuningGame4);
router.get("/runing5/:Userid", readRuningGame5);
router.get("/", readAll);
router.post("/cancel", readAllCancle);
router.post("/success", readAllSuccess);
router.post("/user/status", readByUser);
router.post("/", add);      
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/report", successGameReport);
router.post("/report2", cancelGameReport);


function readByUser(req, res, next) {
  gameService
    .readByUser(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}



function add(req, res, next) {
  console.log(req.body)
  gameService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  gameService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function remove(req, res, next) {
  gameService
    .remove(req,res,next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  gameService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readRuningGame(req, res, next) {
  gameService
    .readRuningGame(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readRuningGame1(req, res, next) {
  gameService
    .readRuningGame1(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readRuningGame2(req, res, next) {
  gameService
    .readRuningGame2(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readRuningGame3(req, res, next) {
  gameService
    .readRuningGame3(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readRuningGame4(req, res, next) {
  gameService
    .readRuningGame4(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readRuningGame5(req, res, next) {
  gameService
    .readRuningGame5(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  gameService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAllCancle(req, res, next) {
  gameService
    .readAllCancle(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAllSuccess(req, res, next) {
  gameService
    .readAllSuccess(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function successGameReport(req, res, next) {
  gameService
    .successGameReport(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function cancelGameReport(req, res, next) {
  gameService
    .cancelGameReport(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
