var express = require('express')
var router = express.Router()

//定义GET请求的路由 /表示请求一个根路由
router.get('/', function(req, res){
      //res.send('首页');

      var list = [
            {
                  title: 'liurushi',
                  age: 18
            },
            {
                  title: 'pipixia',
                  age: '18'
            }
      ]
      //render渲染 参数写文件名
      res.render('index', {
            title: '拉勾网后台管理系统',
            message: 'liurushi',
            data: list
      })
})

module.exports = router;