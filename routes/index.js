var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
var multer = require('multer');
const e = require("express");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    if(file.mimetype == 'image/jpeg'){
      cb(null, 'uploads/');
    }else {
      cb(new Error("Chỉ được up load file .jpg và không được quá  5  file"), false)
    }

  },
  filename: function(req, file, cb) {
    cb(null, Date.now() +".jpg"  );
  },
});

var upload1 = multer({ storage: storage , litmits : {
    filesize : 1 * 1024 ,
    files : 5
  }});

router.get('/upload', function (req , res){
  res.render('upload',{title : "Up file"});
})
router.post('/upload' ,upload1.single('avatar'), (req , res , next ) =>{
  const file = req.file;
  if(!file){
    res.send("lỗi rồi ")
  }else {
    res.send("up load thành công")
  }
})

module.exports = router;
