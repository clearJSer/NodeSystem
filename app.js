var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var session = require('express-session')

// 引入接口路由
var apiIndex = require('./router/api/index')
var apiUsers = require('./router/api/users')
var apiPosition = require('./router/api/position')

// 引入前端路由
var feIndex = require('./router/fe/index')
var fePosition = require('./router/fe/position')

// 配置模板
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// 配置body解析器
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// session 配置
app.use(session({
  secret: 'lagouadmin',
  cookie: { maxAge: 20 * 60 * 1000},
  resave: true,
  saveUninitialized: false
}))

// 定义接口路由
app.use('/api', apiIndex)
app.use('/api/users', apiUsers)
app.use('/api/position', apiPosition)

// 定义前端路由
app.use('/', feIndex)
app.use('/position', fePosition)

// 静态资源的路径
app.use(express.static(path.join(__dirname, 'public')))

app.listen(4000)

// app.use(function (req, res, next){
//   console.log(1)
//   next()
// })
//
// app.use(function (req, res, next) {
//   console.log(2)
// })
