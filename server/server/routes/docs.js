var express = require('express');
var router = express.Router();

//引入User集合
const Document = require('../model/document');

//添加问卷
router.post('/', async (req, res) => {
  /*
  docsInfo: ""
  docsName: "关于测试的问卷"
  questionList: Array(3)

  questionList: Array(3)
0:
author: "6011289bc3510e13b4ce520d"
createdAt: "2021-01-29T08:05:33.557Z"
option: Array(2)

option: Array(2)
0:
name: "是大法官"
1:
name: "好几款"
length: 2


registerTime: "2021-01-29T08:05:33.554Z"
required: true
status: 0
title: "阿萨德股份"
type: 0
updatedAt: "2021-01-29T08:05:33.557Z"
value: ""
__v: 0
_id: "6013c1cdc0f8540a3c2beeec"

2:
author: "6011289bc3510e13b4ce520d"
createdAt: "2021-01-29T08:05:51.791Z"
option: Array(0)
registerTime: "2021-01-29T08:05:51.790Z"
required: true
status: 0
title: "电饭锅和"
type: 2
updatedAt: "2021-01-29T08:05:51.791Z"
value: ""
__v: 0
_id: "6013c1dfc0f8540a3c2beeee"
  */
  let { title, info, author, questionList } = req.body
  try{
    const result = await Document.insertMany([{
      title: title,
      info: info,
      author: author,
      questionList: questionList
    }])
    // console.log(result[0]);
    return res.json({
      code: 0,
      message: '添加成功',
      data: result[0]
    })
  }catch(e){
    return res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

//根据用户id 查询该用户的所有问卷
router.get('/', async (req, res) => {
  let id = req.query.id
  try{
    const result = await Document.find({author: id})
    // console.log(result);
    res.json({
      code: 0,
      data: result
    }) 
  }catch(e){
    console.log(e);
    res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

//根据id 更新问卷上/下架状态
router.post('/updateStatus', async (req, res) => {
  let { id, status } = req.body
  try{
    const result = await Document.findOneAndUpdate({_id: id}, {status: status})
    // console.log(result);
    res.json({
      code: 0,
      message: '更新成功'
    })
  }catch(e){
    console.log(e);
    res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

//根据id 删除问卷
router.get('/del', async (req, res) => {
  let { id } = req.query
  try{
    await Document.deleteOne({_id: id})
    res.json({
      code: 0,
      message: '删除成功'
    })
  }catch(e){
    console.log(e);
    res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

module.exports = router;
