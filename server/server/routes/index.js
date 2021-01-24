var express = require('express');
var router = express.Router();
const User = require('../model/user')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//获取数量信息
router.get('/count', async (req, res) => {
  //用户数
  const userNums = await User.estimatedDocumentCount()

  // console.log(userNums);
  res.json({
    code: 0,
    data: {
      userNums: userNums
    }
  })
})

module.exports = router;
