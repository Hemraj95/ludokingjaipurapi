const express = require("express");
const router = express.Router();
const masterImportService = require("../service/masterimport.service");


router.post("/", add);
router.post("/citeis", citeis);


function add(req, res, next) {
    masterImportService
    .bulkStateSave(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}
function citeis(req, res, next) {
    masterImportService
    .bulkCitySave(req)
    .then((data) => res.send(data))
    .catch((err) => next(err));
}


module.exports = router;
