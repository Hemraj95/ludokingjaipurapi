const express = require("express");
const router = express.Router();
const gameService = require("../service/game1F.service");

router.get("/:id", read);
router.get("/", readAll);
router.post("/cancel", readAllCancle);
router.post("/success", readAllSuccess);
router.post("/", add);      
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/report", unsolvedGame);


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
function unsolvedGame(req, res, next) {
  gameService
    .unsolvedGame(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
