//引入mongoose
const mongoose = require('mongoose');
//创建用户集合规则
const userSchema = new mongoose.Schema({
  avatar: {
    type: String,
    default: '/images/avatar_default.png'
  },
  username: {
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
  role: {
    type: String,
    default: 'users'
  },
  registerTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

//创建用户集合
const User = mongoose.model('User', userSchema);

//导出用户集合构造函数
module.exports = User;