const express = require("express");
const router = express.Router();
const packageService = require("../service/packages.services");

router.get("/:id", read);
router.get("/", readAll);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

function add(req, res, next) {
  console.log(req.body)
  packageService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  packageService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function remove(req, res, next) {
  packageService
    .remove(req,res,next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  packageService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  packageService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
