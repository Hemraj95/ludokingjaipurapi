const express = require("express");
const router = express.Router();

const sendEmail1  = require("../service/sendEmail");

router.post("/sendEmail", send);
router.get("/", readAll);

function send(req, res, next) {
    console.log(req.body)
    sendEmail1
      .sendEmail(req,res)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }
  function readAll(req, res, next) {
    sendEmail1
      .readAll(req)
      .then((data) => res.send(data))
      .catch((err) => next(err));
  }

module.exports = router;
