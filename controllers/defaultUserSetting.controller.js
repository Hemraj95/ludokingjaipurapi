const express = require("express");
const router = express.Router();
const defaultUserSettingService = require("../service/defaultUserSetting.service");

router.get("/:id", read);
router.get("/", readAll);
router.get("/state/:stateId", readByState);
router.post("/", add);
router.put("/:id", update);
router.delete("/:id", remove);

function add(req, res, next) {
    console.log(req.body)
    defaultUserSettingService
      .add(req,res)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }
  function update(req, res, next) {
    defaultUserSettingService
      .update(req)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }
  function remove(req, res, next) {
    defaultUserSettingService
      .remove(req,res,next)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }
  
  function read(req, res, next) {
    defaultUserSettingService
      .read(req)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }
  function readAll(req, res, next) {
    defaultUserSettingService
      .readAll(req)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }
  function readByState(req, res, next) {
    defaultUserSettingService
      .readByState(req)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }
  
  module.exports = router;