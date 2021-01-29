//引入express框架
var express = require('express');
//引入path内部模块 用来处理路径
var path = require('path');
//引入body-parser 处理post请求参数
var bodyParser = require('body-parser')

const session = require('express-session')

//引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var quesRouter = require('./routes/ques');
var docsRouter = require('./routes/docs');

//创建服务器
var app = express();

//连接数据库
require('./model/connect')

//添加处理post请求的中间件
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//静态资源
app.use(express.static(path.join(__dirname, 'public')));

//设置session中间件
app.use(session({
  //设置cookie名称
  name: 'questionnaireUser',
  //用它来对session cookie签名，防止篡改
  secret: 'abc123',
  //强制保存session即使它并没有变化
  resave: true,
  //强制将未初始化的session存储
  saveUninitialized: true,
  //如果为true,则每次请求都更新cookie的过期时间
  rolling: true,
  //cookie过期时间 1天
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}))

app.use((req, res, next) => {
  req.userInfo = req.session.userInfo || {}
  next()
})

//路由的入口
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter)
app.use('/ques', quesRouter)
app.use('/docs', docsRouter)

//处理错误
app.use((err, req, res, next) => {
  console.log(err)
  res.status(err.status || 500);
  res.json({
      message: '服务端错误'
  })
})

module.exports = app;
