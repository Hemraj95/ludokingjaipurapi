const express = require("express");
const router = express.Router();
const adminService = require("../service/admin.service");

router.get("/:id", read);
router.get("/", readAll);
router.post("/deleted", deletedMember);
router.post("/", add);
router.put("/:id", update);
router.put("/update/:id", update1);
router.delete("/:id", remove);
router.get("/user/:_id", readByUser);
router.post("/user1/:_id", readByUser1);
router.get("/user2/:_id", readByUser2);

function readByUser(req, res, next) {
  adminService
    .readByUser(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByUser2(req, res, next) {
  adminService
    .readByUser2(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByUser1(req, res, next) {
  adminService
    .readByUser1(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function add(req, res, next) {
  console.log(req.body);
  adminService
    .add(req, res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  adminService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update1(req, res, next) {
  adminService
    .update1(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function remove(req, res, next) {
  adminService
    .remove(req, res, next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  adminService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  adminService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function deletedMember(req, res, next) {
  adminService
    .deletedMember(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

module.exports = router;
