var express = require('express');
var router = express.Router();

//引入User集合
const Question = require('../model/question');

//添加题目
router.post('/', async (req, res) => {
  let { title, type, required, option,author } = req.body
  try{
    const result = await Question.insertMany([{
      title: title,
      type: type,
      required: required,
      option: option,
      author: author
    }])
    // console.log(result);
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

//根据id 删除题目
router.get('/del', async (req, res) => {
  let id = req.query.id
  try{
    await Question.deleteOne({_id: id})
    res.json({
      code: 0,
      message: '删除成功'
    })
  }catch(e) {
    console.log(e);
    res.json({
      code: 1,
      message: '删除失败，稍后再试'
    })
  }
})

module.exports = router;
