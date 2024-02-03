const express = require("express");
const router = express.Router();
const profitService = require("../service/profit.service");

router.get("/:id", read);
router.get("/", readAll);
router.post("/", add);
router.put("/:id", update);
router.post("/report", profitReport);



function add(req, res, next) {
  console.log(req.body)
  profitService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  profitService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


function read(req, res, next) {
  profitService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  profitService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function profitReport(req, res, next) {
  profitService
    .profitReport(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

module.exports = router;
