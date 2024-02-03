const express = require("express");
const router = express.Router();
const walletService = require("../service/wallet.service");

router.get("/:id", read);
router.get("/", readAll);
router.post("/", add);
router.put("/:id", update);



function add(req, res, next) {
  console.log(req.body)
  walletService
    .add(req,res)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function update(req, res, next) {
  walletService
    .update(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


function read(req, res, next) {
  walletService
    .read(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function readAll(req, res, next) {
  walletService
    .readAll(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
