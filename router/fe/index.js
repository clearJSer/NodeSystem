var express = require('express');
var router = express.Router();

//定义GET请求的路由 /表示请求一个根路由
router.get('/', function (req, res) {
  res.render('fe/index', {username: req.session.username || ''})
})

//将router暴露出去
module.exports = router;