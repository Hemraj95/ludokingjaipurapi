const express = require("express");
const router = express.Router();
const paymentService = require("../service/payment.service");

router.get("/:id", read);
router.get("/", readAll);
router.get("/user/:userid", readByUser);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);
router.post("/report", reachargeReport);
router.post("/report2", reachargeReport2);


function readByUser(req, res, next) {
  paymentService
    .readByUser(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function add(req, res, next) {
  console.log(req.body)
  paymentService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  paymentService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function remove(req, res, next) {
  paymentService
    .remove(req,res,next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  paymentService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  paymentService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function reachargeReport(req, res, next) {
  paymentService
    .reachargeReport(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function reachargeReport2(req, res, next) {
  paymentService
    .reachargeReport2(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
