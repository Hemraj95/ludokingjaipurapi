const express = require("express");
const router = express.Router();
const upiService = require("../service/upi.service");

router.get("/:id", read);
router.get("/", readAll);
router.post("/active/", readByState);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);



function add(req, res, next) {
  console.log(req.body)
  upiService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  upiService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function remove(req, res, next) {
  upiService
    .remove(req,res,next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  upiService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  upiService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByState(req, res, next) {
  upiService
    .readByState(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

module.exports = router;
