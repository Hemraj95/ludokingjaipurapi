const express = require("express");
const router = express.Router();
const orderIdService = require("../service/orderId.service");

router.get("/:id", read);
router.get("/", readAll);
router.post("/", add);
router.put("/:id", update);


function add(req, res, next) {
  console.log(req.body)
  orderIdService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  orderIdService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


function read(req, res, next) {
  orderIdService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  orderIdService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}



module.exports = router;
