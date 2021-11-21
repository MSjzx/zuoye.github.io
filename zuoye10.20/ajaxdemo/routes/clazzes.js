var express = require('express');
var router = express.Router();
var fs = require('fs');


// 查询班级
router.get('/getClazz', function (req, res) {

  fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {
    // 如果发生错误，打印错误信息并退出函数
    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // 将要返回的结果
    var results = [];

    // 指定的id
    var myid = req.query.id;

    // 指定的name
    var myname = req.query.name;

    // 获取指定id的班级信息
    if(myid) {

      data.forEach(function (item, index) {
        if (item.id == myid) {
          results.push(item);
        }
      });

    } else if(myname) {
      // 获取指定name的班级信息
      data.forEach(function (item, index) {
        if (item.name.includes(myname)) {
          result.push(item);
        }
      });

    } else {
      // 获取所有班级
      results = data;
    }

    res.status(200).send(results);

  });
});


// 创建班级
router.post('/addClazz', function (req, res) {

  fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {
    // 试着将数据解析成数组
    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    // 将时间戳作为班级ID
    req.body.id = Date.now();

    // 设置班级的创建时间
    req.body.date = new Date().toLocaleDateString();

    // 设置班级的修改时间
    // req.body.update = new Date().toLocaleDateString();

    // 将题型信息添加到数组中
    data.push(req.body);

    // 将数据写回到文件中
    fs.writeFile(__dirname + './../data/clazzes.json', JSON.stringify(data), function (err) {
      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      res.status(200).send(data);
    });
  });
});

// 删除班级
router.get('/removeClazz', function (req, res) {

  fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {

    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    var index = -1;

    var myid = req.query.id;

    data.forEach(function (item, i) {
      if (item.id == myid) {
        index = i;
      }
    });

    if (index >= 0) {
      data.splice(index, 1);
    }

    fs.writeFile(__dirname + './../data/clazzes.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      res.status(200).send(data);
    });
  });
});

// 修改班级
router.post('/updateClazz', function (req, res) {

  fs.readFile(__dirname + './../data/clazzes.json', 'utf8', function (err, data) {

    if (err) {
      res.status(500).end();
      return console.log(err);
    }

    try {
      data = JSON.parse(data);
    } catch (e) {
      res.status(500).end();
      return console.log(e);
    }

    data.forEach(function (item, index) {
      if (item.id == req.body.id) {
        data[index] = req.body;
      }
    });

    fs.writeFile(__dirname + './../data/clazzes.json', JSON.stringify(data), function (err) {

      if (err) {
        res.status(500).end();
        return console.log(err);
      }

      res.status(200).send(data);
    });
  });
});

module.exports = router;
