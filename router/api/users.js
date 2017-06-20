var express = require('express')
var router = express.Router()
var db = require('../../utils/db')

//用户注册
router.post('/signup',function(req,res){
  console.log(req.body.password)
  db({
    collection: 'users',
    type: 'save',
    data: {username: req.body.username, password: req.body.password, email: req.body.email},
    callback: function (results) {
      res.redirect('/?signin')
    }
  })
})

//用户登录
router.post('/signin', function (req, res) {
  console.log()
  db({
    collection: 'users',
    type: 'findAll',
    data: {username: req.body.username, password: req.body.password},
    callback: function (results) {
      if (results.length > 0) {
        req.session.username = results[0].username
        //res.render('fe/index.ejs', {username: results[0].username})
       res.redirect('/')
      } else {
        res.redirect('/?signin')
      }
    }
  })
})
//客户端用户登录
router.post('/clientsignin', function (req, res) {
  console.log("客户端用户登录");
  console.log(req.body.phone)
  console.log(req.body.password)
  db({
    collection: 'users',
    type: 'find',
    data: {phone: req.body.phone, password: req.body.password},
    callback: function (results) {
      if (results.length > 0) {
        req.session.username = results[0].username
        //res.render('fe/index.ejs', {username: results[0].username})
        // res.redirect('/')
        res.send("1")
      } else {
        //res.redirect('/?signin')
        //密码错误
        res.send("2")
      }
    }
  })
})
//客户端注册
router.post('/clientsignup', function (req, res) {
  console.log("客户端注册")
  db({
    collection: 'users',
    type: 'save',
    data: {phone: req.body.phone, password: req.body.password},
    callback: function (results) {
      //res.redirect('/?signin')
      if(results.ok == "1"){
        res.send("1")
      }else{
        res.send("0")
      }
    }
  })
})

// 用户注销
router.get('/signout', function (req, res) {
  req.session.destroy(function (err) {
    res.redirect('/')
  })
  // req.session.username = null
  // res.redirect('/')
})
module.exports = router;


// //类型1、
// router.get('/signin', function(req, res){      
//       //http://localhost:3000/users/signin?username=123&pwd=aaaaaaaaa
//       //类似于上面这种格式 用req.query来取后面的值
//       //res.send(req.query);
// })

//类型2、
// router.get('/signin/:id', function(req, res){
//       //在后面用类似:id的 用req.params.id来获取
//       res.send(req.params.id);
// })