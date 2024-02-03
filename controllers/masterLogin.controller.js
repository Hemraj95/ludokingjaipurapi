const express = require("express");
const masterLoginService = require("../service/masterLogin.service");
const router = express.Router();

router.post("/", validate);
router.post("/mobile", readByMobile);

function validate(req, res, next) {
  masterLoginService
    .validate(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readByMobile(req, res, next) {
  masterLoginService
    .readByMobile(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
module.exports = router;
