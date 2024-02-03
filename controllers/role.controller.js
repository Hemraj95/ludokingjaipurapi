const express = require("express");
const router = express.Router();
const roleService = require("../service/role.service");

router.get("/:id", read);
router.get("/", readAll);
router.get("/state/:stateId", readByState);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);



function add(req, res, next) {
  console.log(req.body)
  roleService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  roleService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function remove(req, res, next) {
  roleService
    .remove(req,res,next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  roleService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  roleService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByState(req, res, next) {
  roleService
    .readByState(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

module.exports = router;
