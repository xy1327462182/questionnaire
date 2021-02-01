//引入mongoose
const mongoose = require('mongoose');
//创建集合规则

//问题中选项的属性规则
const attrSchema = new mongoose.Schema({
  name: {
    type: String
  },
  resNums: {
    type: Number,
    default: 0
  }
});

//问题集合规则
const questionSchema = new mongoose.Schema({
  questionId: {//问题集合对应的id
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  },
  title: {//标题
    type: String,
    required: true,
  },
  type: {//类型 0单选 1多选 2打分  3输入框
    type: Number,
    default: 0,
    required: true
  },
  must: {
    type: Boolean
  },
  options: {//选项  每个选项在数组中
    type: [attrSchema],
    default: []
  },
  valueList: {//表单类型的  是表单值
    type: Array,
    default: []
  },
  order: {//排序
    type: Number,
    default: 0
  },
  status: {//状态
    type: Number, //0 上架  1 下架
    default: 0
  }
});

//问卷集合规则
const documentSchema = new mongoose.Schema({
  title: {//标题
    type: String,
    required: true,
  },
  info: {//说明简介
    type: String,
    default: ''
  },
  author: {//作者 关联到用户集合
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questionList: {//问题列表  关联到问题集合规则
    type:[questionSchema],
    default:[]
  },
  responseNums: {//填写人数
    type: Number,
    default: 0
  },
  status: {//状态
    type: Number, //0 上架  1 下架
    default: 0
  },
  registerTime: {//创建时间
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

//创建集合
const Document = mongoose.model('Document', documentSchema);

//导出集合构造函数
module.exports = Document;