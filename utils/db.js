var MongoClient = require('mongodb').MongoClient
var ObjectID = require('mongodb').ObjectID;
var DB_CONN_STR = 'mongodb://localhost:27017/gp3'
var _dbctrl = {
  save: function (coll, data, cb) {
    coll.save(data, function (err, results) {
      if (err) {
        console.log(err)
      } else {
        cb(results)
      }
    })
  },

  findAll: function (coll, data, cb) {
    coll.find(data).sort({_id:-1}).toArray(function (err, results) {
      cb(results)
    })
  },

  count: function (coll, data, cb) {
    coll.count(data, function (err, count) {
      cb(count)
    })
  },

  findMany: function (coll, data, cb, limit, skip) {
    coll.find(data).sort({_id:-1}).skip(skip).limit(limit).toArray(function (err, results) {
      cb(results)
    })
  },
  deleteOne:function(coll,data,cb){
    // coll.remove(data,function(err,results){
      
    // })
    coll.findAndRemove({_id: new ObjectID(data._id)},function(err,results){
        cb(results);
    })
  },
  update : function(coll,data,cb){
    var old = data.old;
    coll.update({_id: new ObjectID(old)},data.data,function(err,results){
        cb(results);
    })
  }
}

// 数据库连接
var _dbconn = function (opts) {
  MongoClient.connect(DB_CONN_STR, function (err, db) {
    if (err) {
      console.log(err)
    } else {
      console.log('数据库连接成功');
      var coll = db.collection(opts.collection)
      _dbctrl[opts.type](coll, opts.data, opts.callback, opts.limit, opts.skip)
    }
  })
}

module.exports = _dbconn