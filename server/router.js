//下面两处user一定要删掉，虽然没写这部分，但是如果存在会报错
let express = require('express')
let router = express.Router()
// let user= require('./API/user')
let info = require('./API/list')
let time = require('./API/time')
// router.get('/user', user.get)
router.get('/list/all', info.all)
router.get('/list/get', info.get)
router.get('/list/add', info.add)
router.get('/list/update', info.update)
router.get('/list/del', info.del)
router.get('/api/time/update', time.update)
router.get('/api/time/get', time.get)
router.get('/api/time/del', time.del)
router.get('/api/time/add', time.add)

module.exports = router
