var express = require('express');
var router = express.Router();

//引入集合
const Document = require('../model/document');
const User = require('../model/user');

//添加问卷
router.post('/', async (req, res) => {
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

//获取问卷列表分页数据
router.get('/list', async (req, res) => {
  let { skip, limit } = req.query
  try {
    const docsList = await Document.find({}).skip(Number(skip)).limit(Number(limit)).exec()
    // console.log(list);
    //获取用户数据总条数
    const docsNums = await Document.estimatedDocumentCount()
    //总页数
    const pages = Math.ceil(docsNums / limit)
    //当前页数
    let page = 1
    if (skip == 0) {
      page = 1
    } else {
      page = (skip / limit) + 1
    }
    let list = JSON.parse(JSON.stringify(docsList))

    //生成创建人手机号
    for (let i=0; i < list.length; i++) {
      let user = await User.findOne({_id: list[i].author})
      list[i].phone = user.phone
    }
    res.json({
      code: 0,
      data: {
        list: list,
        total: docsNums,
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

//根据问卷id 查询问卷
router.get('/doc', async (req, res) => {
  let id = req.query.id
  try{
    const result = await Document.findOne({_id: id})
    res.json({
      code:0,
      message: '查询成功',
      data: result
    })
  }catch(e) {
    console.log(e);
    res.json({
      code: 1,
      message: '网络错误，稍后再试'
    })
  }
})

//根据问卷名称 搜索问卷
router.get('/find', async (req, res) => {
  let { keyword } = req.query
  try{
    let result = await Document.findOne({title: keyword}) 
    // let titleReg = new RegExp(keyword, "g")
    if (result) {
      let user = await User.findOne({_id: result.author})
      let docs = JSON.parse(JSON.stringify(result))
      docs.phone = user.phone
      return res.json({
        code: 0,
        data: {
          list: [docs],
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

//根据问卷id 更新问卷上/下架状态
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

//根据问卷id 更新问卷
router.post('/update', async (req, res) => {
  let { id, title, userid, resultList } = req.body
  //1.更新问卷的信息

  //获取问卷信息
  let docs = await Document.findOne({_id: id})
  // console.log(docs);
  
  //1.1 问卷填写人数+1
  docs.responseNums = docs.responseNums + 1

  //1.2 题目回答数据处理
  resultList.forEach((item,index)=>{
    if (item.type == 0 && item.optionResult) {//单选
      docs.questionList[item.index].options.forEach((option)=>{
        if (option.name == item.optionResult) {
          //选项回答人数+1
          option.resNums = option.resNums + 1
        }
      })
    } else if (item.type == 1 && item.optionResultList.length > 0) {//多选
      item.optionResultList.forEach((check)=>{
        docs.questionList[item.index].options.forEach((option)=>{
          if (check == option.name) {
            //选项回答人数+1
            option.resNums = option.resNums + 1
          }
        })
      })
    } else if (item.type == 2 && item.optionResult) {//打分题
      let scoreObj = docs.questionList[item.index].options[item.optionResult - 1]
      scoreObj.resNums = scoreObj.resNums + 1
    } else if (item.type == 3 && item.optionResult) {//填空题
      docs.questionList[item.index].valueList.push(item.optionResult)
    }
  })

  //2.更新用户信息
  //将本问卷加入到填写人的docsList中
  let fillUser = await User.findOne({_id: userid})
  fillUser.docsList.unshift({
    documentId: id,
    title: title
  })
  try{
    await Document.updateOne({_id: id}, docs)
    await User.updateOne({_id: userid}, fillUser)
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

//根据问卷id 删除问卷
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
