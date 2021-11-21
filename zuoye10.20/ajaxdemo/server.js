var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Content-Type', 'application/json');
  next();
});


app.use('/mgt/api/student', require('./routes/students'));
app.use('/api/clazz', require('./routes/clazzes'));


app.listen(8080, function () {
  console.log('服务已经开启。后台接口地址： http://localhost:8080');
});