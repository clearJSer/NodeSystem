var express = require('express')
var router = express.Router()

router.get('/', function (req, res) {
  res.redirect('/api/position/list')
})

module.exports = router
