var express = require('express');
var router = express.Router();

var multer  = require('multer');
var path = require("path");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+'.png')
    }
});

var upload = multer({ storage: storage });

var myUploadLog = new Array(0);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Study Jams' ,'imgs': myUploadLog });
});

router.post('/upload', upload.single('img'), function(req, res, next) {
    myUploadLog.push(req.file);
    res.json(
        {
            filename: req.file
        }
    )
});

module.exports = router;
