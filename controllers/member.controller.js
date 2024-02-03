const express = require("express");
const router = express.Router();
const memberService = require("../service/member.service");

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
router.post("/report", userCountReport);
router.post("/refral", readByReferalCode);

function readByUser(req, res, next) {
  memberService
    .readByUser(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByUser2(req, res, next) {
  memberService
    .readByUser2(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByUser1(req, res, next) {
  memberService
    .readByUser1(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function add(req, res, next) {
  console.log(req.body);
  memberService
    .add(req, res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  memberService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update1(req, res, next) {
  memberService
    .update1(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function remove(req, res, next) {
  memberService
    .remove(req, res, next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  memberService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  memberService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function deletedMember(req, res, next) {
  memberService
    .deletedMember(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function userCountReport(req, res, next) {
  memberService
    .userCountReport(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByReferalCode(req, res, next) {
  memberService
    .readByReferalCode(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

module.exports = router;
