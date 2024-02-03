const express = require("express");
const db = require("./_helpers/db");
const multer = require('multer');
const router = express.Router();

const dbRole = db.role;
var filePath ;
// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define the destination directory where files will be saved
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Define the filename for the saved file
    filePath = file.fieldname + '-' + Date.now() + '-' + file.originalname
    cb(null, filePath);

  },
 

}
);

// Create Multer instance with the configured storage
const upload = multer({ storage: storage });
router.post('/', upload.single('file'), (req, res) => {
    var data ={
      data: filePath, responseCode: 1, responseMessage: "success"
    }
    res.send(data);
    console.log(filePath)
  })
  router.get(`/:filename`, (req, res) => {
    console.log("hii")
    const filename = req.params.filename;
    console.log(`${__dirname}/uploads/${filename}`)
    res.sendFile(`${__dirname}/uploads/${filename}`);
  });

module.exports = router
