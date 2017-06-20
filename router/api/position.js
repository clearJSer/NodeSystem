var express = require('express')
var router = express.Router()

var fs = require('fs')

var formidable = require('formidable')
var form = new formidable.IncomingForm()

var date = require('../../utils/date')
var db = require('../../utils/db')

var async = require('async')

router.post('/add', function (req, res) {
  if (req.session.username) {
    // 配置信息
    form.encoding = 'utf-8'
    form.uploadDir = './public/images/upload'
    form.keepExtensions = true
    form.type = true
    form.maxFieldsSize = 2 * 1024 * 1024

    // 上传
    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err)
      } else {
        // 数据格式化
        var path = files.logo.path
        var newName = new Date().getTime()+path.substr(path.lastIndexOf('.')) ;
        console.log(newName)
        fs.rename(path,path.substring(0,path.lastIndexOf('\\'))+'\\'+newName,function(err){
          console.log("file renaem success");
        })
        var data = {
          name: fields.name,
          span: fields.span,
          logo: newName ,
          createdate: date(),
          rate: fields.rate,
          stepAmount:fields.stepAmount
        }

        // 插入数据
        db({
          collection: 'production',
          type: 'save',
          data: data,
          callback: function (results) {
            res.redirect('/position')
          }
        })
      }
    })
  } else {
    // res.send('\<script\>alert("请重新登录")\<\/script\>')
    res.redirect('/?signin')
  }
})

router.get('/list', function (req, res) {
  //if (req.session.username) {

    var pageNo = parseInt(req.query.pageno, 10) || 0
    var pageSize = 6

    // 获得职位信息
    async.series([
      function (callback) {
        db({
          collection: 'production',
          type: 'count',
          data: {},
          callback: function (results) {
            var totalPage = Math.ceil(results/pageSize)-1
            if (pageNo > totalPage) {
              pageNo = 0
            }
            callback(null, results)
          }
        })
      },
      function (callback) {
        db({
          collection: 'production',
          type: 'findMany',
          limit: pageSize,
          skip: pageNo * pageSize,
          data: {},
          callback: function (results) {
            callback(null, results)
          }
        })
      }
    ], function (err, results) {
      if (req.query.type === 'fe') {
        res.render('api/position/list', {
          datalist: results[1]
        })
      } else {
        res.render('fe/position', {
          username: req.session.username || '',
          count: results[0],
          datalist: results[1],
          pageSize: pageSize,
          pageNo: pageNo
        })
      }
    })
  // } else {
  //   res.redirect('/?signin')
  // }
})
router.get('/delete',function(req,res){
  if(req.session.username){
    console.log(req.query.id+"======================");
    db({
          collection: 'production',
          type: 'deleteOne',
          data: {_id:req.query.id},
          callback: function (results) {
             res.redirect('/position')
          }
        })
  }else{
     res.redirect('/?signin')
  }
})
router.post('/update',function(req,res){
  // 配置信息
    form.encoding = 'utf-8'
    form.uploadDir = './public/images/upload'
    form.keepExtensions = true
    form.type = true
    form.maxFieldsSize = 2 * 1024 * 1024

    // 修改
    form.parse(req, function(err, fields, files) {
      if (err) {
        console.log(err)
      } else {
        // 数据格式化
        // var path = files.logo.path
        // var newName = new Date().getTime()+path.substr(path.lastIndexOf('.')) ;
        // fs.rename(path,path.substring(0,path.lastIndexOf('\\'))+'\\'+newName,function(err){
        //   console.log("file renaem success");
        // })
        var data = { 
          old :fields.id,
          data:{
            name: fields.name,
            span: fields.span,
            logo: fields.logo ,
            createdate: date(),
            rate: fields.rate,
            stepAmount:fields.stepAmount
          }
        }

        // 插入数据
        db({
          collection: 'production',
          type: 'update',
          data: data,
          callback: function (results) {
            
          }
        })
        res.redirect('/position')
      }
    })
})

module.exports = router
