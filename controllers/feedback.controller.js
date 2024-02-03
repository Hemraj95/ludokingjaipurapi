const express = require("express");
const router = express.Router();
const feedback = require("../service/feedback.service");

router.get("/:id", read);
router.get("/", readAll);

router.post("/", add);
router.delete("/:id", remove);





function add(req, res, next) {
  console.log(req.body)
  feedback
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function remove(req, res, next) {
  feedback
    .remove(req,res,next)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}

function read(req, res, next) {
  feedback
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  feedback
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
