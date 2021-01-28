//引入mongoose
const mongoose = require('mongoose');
//创建集合规则
const questionSchema = new mongoose.Schema({
  title: {//标题
    type: String,
    required: true,
  },
  type: {//类型 0单选 1多选 2打分  3输入框
    type: Number,
    default: 0,
    required: true
  },
  required: {
    type: Boolean,
    default: false
  },
  option: {//选项  每个选项在数组中
    type: Array,
    default: []
  },
  value: {//表单类型的  是表单值
    type: String
  },
  author: {//作者
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {//状态
    type: Number, //0 上架  1 下架
    default: 0
  },
  registerTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

//创建集合
const Question = mongoose.model('Question', questionSchema);

//导出集合构造函数
module.exports = Question;