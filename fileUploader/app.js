//引入express模块
var express = require('express');
//引入multer模块
var multer = require('multer');
var cors = require('cors');
var path = require('path');
var fs = require('fs')
//设置上传的目录，

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      var _path = path.join(__dirname, "../uploadFile");
      if(!fs.existsSync(_path)){
          fs.mkdirSync(_path);
      }
      cb(null, _path);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
      // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
      cb(null, file.originalname);  
  }
});

var upload = multer({ storage: storage })

var app = express();
app.use(cors());

app.use(express.static(path.join(__dirname, '/')));

app.post('/upload', upload.array('files'), function (req, res, next) {
  console.log(req.files);
  res.json({
    status: 200,
    message: "上传成功"
  });
});

app.listen(3360, () => {
  console.log('running at port: 3360')
})