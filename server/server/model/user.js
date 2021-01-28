//引入mongoose
const mongoose = require('mongoose');

const docsSchema = new mongoose.Schema({
  documentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document'
  },
  title: {//标题
    type: String,
  },
  responseNums: {//填写人数
    type: Number,
    default: 0
  },
  status: {//状态
    type: Number, //0 上架  1 下架
    default: 1
  },
  registerTime: {//创建时间
    type: Date,
    default: Date.now
  }
})

//创建用户集合规则
const userSchema = new mongoose.Schema({
  avatar: {//头像
    type: String,
    default: '/images/avatar_default.png'
  },
  username: {//用户名
    type: String,
    default: 'users'
  },
  phone: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  role: {//角色  users普通用户  admin管理员
    type: String,
    default: 'users'
  },
  registerTime: {//注册时间
    type: Date,
    default: Date.now
  },
  docsList: {//填过的问卷
    type: [docsSchema],
    default: []
  }
}, {
  timestamps: true
})

//创建用户集合
const User = mongoose.model('User', userSchema);

//导出用户集合构造函数
module.exports = User;