const express = require("express");
const router = express.Router();
const withdrawService = require("../service/withdraw.service");

router.get("/:id", read);
router.get("/", readAll);
router.get("/user/:userid", readByUser);
router.post("/", add);
router.put("/:id", update);
router.post("/report", reachargeReport);
router.post("/report2", reachargeReport2);


function readByUser(req, res, next) {
  withdrawService
    .readByUser(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function add(req, res, next) {
  console.log(req.body)
  withdrawService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  withdrawService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


function read(req, res, next) {
  withdrawService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  withdrawService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function reachargeReport(req, res, next) {
  withdrawService
    .reachargeReport(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function reachargeReport2(req, res, next) {
  withdrawService
    .reachargeReport2(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
