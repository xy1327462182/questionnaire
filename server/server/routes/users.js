var express = require('express');
var router = express.Router();

//引入User集合
const User = require('../model/user');
//引入加密模块
const hmac = require('../util/hmac');

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

//注册用户
router.post('/', async (req, res) => {
  let { phone, password, role, username } = req.body
  if (!role) {
    role = 'users'
  }

  if (!username) {
    username = 'users'
  }
  // console.log(phone, password, role, username);
  const user = await User.findOne({ phone: phone })
  if (user) {
    // console.log(user);
    //如果查询到 证明已经注册
    res.json({
      code: 1,
      message: '该手机号已注册'
    })
    return
  } else {
    try {
      //添加到数据库
      const newUser = await User.insertMany([{
        phone: phone,
        password: hmac(password),
        role: role,
        username: username
      }])
      console.log(newUser);
      res.json({
        code: 0,
        message: '恭喜您注册成功'
      })
    } catch (e) {
      console.log(e);
      res.json({
        code: 1,
        message: '服务端错误'
      })
    }
  }
});

//获取用户列表分页数据
router.get('/list', async (req, res) => {
  let { skip, limit } = req.query
  try {
    const list = await User.find({}).skip(Number(skip)).limit(Number(limit)).exec()
    // console.log(list);
    //获取用户数据总条数
    const userNums = await User.estimatedDocumentCount()
    //总页数
    const pages = Math.ceil(userNums / limit)
    //当前页数
    let page = 1
    if (skip == 0) {
      page = 1
    } else {
      page = (skip / limit) + 1
    }
    res.json({
      code: 0,
      data: {
        list: list,
        total: userNums,
        pages: pages,
        page: page
      }
    })
  } catch (e) {
    console.log(e);
    res.json({
      code: 1,
      message: '网络错误，请稍后再试'
    })
  }
})

//搜索用户
router.get('/search', async (req, res) => {
  let { keyword } = req.query
  console.log(keyword);
  try {
    let user = await User.findOne({ phone: keyword })
    if (user) {
      //如果查询到
      return res.json({
        code: 0,
        data: {
          list: [user],
          pages: 1,
          total: 1,
          page: 1
        }
      })
    } else {
      //没查到
      return res.json({
        code: 1,
        message: '什么也没搜到'
      })
    }
  } catch (e) {
    return res.json({
      code: 1,
      message: '网络错误，请稍后再试'
    })
  }
})

//根据 id 查询用户
router.get('/find', async (req, res) => {
  let { id } = req.query
  try {
    const user = await User.findOne({ _id: id })
    // console.log(user);
    return res.json({
      code: 0,
      data: user
    })
  } catch (e) {
    return res.json({
      code: 1,
      message: '网络错误，请稍后再试'
    })
  }
})

//更新整个用户信息
router.post('/update', async (req, res) => {
  let { form } = req.body
  try {
    //先根据id查询该用户信息
    const oldUser = await User.findOne({ _id: form._id })
    if (oldUser.phone == form.phone) {
      //如果手机号没变 证明用户没更新手机号
      await User.findOneAndUpdate({ _id: form._id }, {
        username: form.username,
        role: form.role
      })
      return res.json({
        code: 0,
        message: '更新成功'
      })
    } else {
      //如果用户更新了手机号
      //1.根据手机号查询是否已经存在
      const phoneUser = await User.findOne({ phone: Number(form.phone) })
      if (phoneUser) {
        //如果查询到
        return res.json({
          code: 1,
          message: '该手机号已经存在'
        })
      } else {
        //如果没有 则更新
        await User.findOneAndUpdate({ _id: form._id }, {
          username: form.username,
          role: form.role,
          phone: Number(form.phone)
        })
        return res.json({
          code: 0,
          message: '更新成功'
        })
      }
    }
  } catch (e) {
    console.log(e);
    return res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

//根据id 更新用户名
router.post('/updateUsername', async (req, res) => {
  let { id, username } = req.body
  try {
    //根据id 更新用户名
    await User.findOneAndUpdate({ _id: id }, {
      username: username
    })
    // console.log(result);
    res.json({
      code: 0,
      message: '更新成功'
    })
  } catch (e) {
    console.log(e);
    res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

//根据id 更新手机号
router.post('/updatePhone', async (req, res) => {
  let { id, phone } = req.body
  try {
    //查询数据库中，是否有该手机号
    const phoneUser = await User.findOne({ phone: Number(phone) })
    if (phoneUser) {
      return res.json({
        code: 1,
        message: '该手机号已存在'
      })
    } else {
      //根据id 更新用户名
      await User.findOneAndUpdate({ _id: id }, {
        phone: phone
      })
      // console.log(result);
      res.json({
        code: 0,
        message: '更新成功'
      })
    }
  } catch (e) {
    console.log(e);
    res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

//删除用户
router.get('/del', async (req, res) => {
  let { id } = req.query
  // console.log(id);
  try {
    await User.deleteOne({ _id: id })
    res.json({
      code: 0,
      message: '删除成功'
    })
  } catch (e) {
    res.json({
      code: 1,
      message: '删除失败，网络错误'
    })
  }

})

//登录
router.post('/login', async (req, res) => {
  //获取post请求参数
  const { phone, password } = req.body
  // console.log(phone);

  //向数据库查询用户数据
  const user = await User.findOne({
    phone: phone,
    password: hmac(password)
  })

  if (user) {
    console.log(user);
    //设置session
    req.session.userInfo = user
    return res.json({
      code: 0,
      message: '登录成功',
      isAdmin: user.role == 'admin' ? true : false,
      data: {
        username: user.username,
        avatar: user.avatar,
        phone: user.phone,
        registerTime: user.registerTime,
        id: user._id
      }
    })
  } else {
    return res.json({
      code: 1,
      message: '用户名或密码不正确'
    })
  }
})

//登出
router.get('/logout', (req, res) => {
  //销毁session
  req.session.destroy()
  return res.json({
    code: 0,
    message: '用户退出成功'
  })
})

module.exports = router;
