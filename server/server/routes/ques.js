var express = require('express');
var router = express.Router();

//引入User集合
const Question = require('../model/question');
const User = require('../model/user');

//添加题目
router.post('/', async (req, res) => {
  let { title, type, must, option,author } = req.body
  try{
    const result = await Question.insertMany([{
      title: title,
      type: type,
      must: must,
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

//获取问题列表分页数据
router.get('/list', async (req, res) => {
  let { skip, limit } = req.query
  try {
    const quesList = await Question.find({}).skip(Number(skip)).limit(Number(limit)).exec()
    //获取数据总条数
    const quesNums = await Question.estimatedDocumentCount()
    //总页数
    const pages = Math.ceil(quesNums / limit)
    //当前页数
    let page = 1
    if (skip == 0) {
      page = 1
    } else {
      page = (skip / limit) + 1
    }
    let list = JSON.parse(JSON.stringify(quesList))

    //生成创建人手机号
    for (let i=0; i < list.length; i++) {
      let user = await User.findOne({_id: list[i].author})
      list[i].phone = user.phone
    }
    res.json({
      code: 0,
      data: {
        list: list,
        total: quesNums,
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

//根据问卷名称 搜索问卷
router.get('/find', async (req, res) => {
  let { keyword } = req.query
  try{
    let result = await Question.findOne({title: keyword}) 
    if (result) {
      let user = await User.findOne({_id: result.author})
      let ques = JSON.parse(JSON.stringify(result))
      ques.phone = user.phone
      return res.json({
        code: 0,
        data: {
          list: [ques],
          pages: 1,
          total: 1,
          page: 1
        }
      })
    } else {
      return res.json({
        code: 1,
        message: '什么也没搜到'
      })
    }
  }catch(e){
    console.log(e);
    res.json({
      code:1,
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
