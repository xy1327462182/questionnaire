var express = require('express');
var router = express.Router();

const hmac = require('../util/hmac')

//引入User集合
const User = require('../model/user')

//初始化管理员账号
router.get('/', async function(req, res, next) {
  let phone = 18888888888
  let username = 'admin'
  let password = 'admin'
  const adminUser = await User.findOne({
    phone: 18888888888
  })
  if (adminUser) {
    res.json({
      code: 1,
      message: '您已经初始化过管理员账号，无法再次初始化! 手机号:18888888888， 密码:admin'
    })
    return 
  } else {
    await User.insertMany([{
      phone: phone,
      password: hmac(password),
      username: username,
      role: 'admin'
    }])
    return res.json({
      code:0,
      message: '初始化管理员成功，手机号:18888888888， 密码:admin'
    })
  }
});

module.exports = router;
