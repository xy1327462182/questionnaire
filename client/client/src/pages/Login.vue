<template>
  <div class="login">
    <div class="title">Welcome Questionnaire</div>
    <div class="login_wrap">
      <div class="login_form_item">
        <van-icon name="phone-o" />
        <van-field
          v-model="phone"
          clearable
          placeholder="请输入手机号"
        />
      </div>
      <div class="login_form_item">
        <van-icon name="eye-o" />
        <van-field
          v-model="password"
          type="password"
          clearable
          placeholder="请输入密码"
        />
      </div>
      <van-button type="primary" block @click="subLogin">登录</van-button>
    </div>
    <div class="other_wrap" @click="goRegister">
      没有账号，去注册
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import util from '../util/index'

export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    //去注册
    goRegister() {
      this.$router.replace('/register')
    },
    //登录提交按钮点击
    subLogin() {
      //验证表单
      const result = this.validate()
      if (result) {
        //验证表单通过
        // console.log(result);
        //发送请求
        this.requestLogin()
      }
    },
    //发送登录请求
    async requestLogin() {
      this.$toast.loading('登录中');
      const res = await axios({
        url: "/api/users/login",
        method: 'post',
        data: {
          phone: this.phone,
          password: this.password
        }
      })
      // console.log(res);
      if (res.data.code == 0) {
        //登录成功
        this.$toast.success(res.data.message);
        //1.将用户信息存进缓存中
        util.saveUserInfo(res.data.data)
        //2.跳转到首页
        this.$router.replace('/home')
      } else {
        //登录失败
        this.$toast.fail(res.data.message);
        //清空表单
        this.phone = ''
        this.password = ''
      }
    },
    //验证表单
    validate() {
      if (!this.phone) {
        this.$toast.fail('请输入手机号');
        return false
      }
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!phoneReg.test(this.phone)) {
        this.$toast.fail('手机号格式不正确');
        return false
      }
      if (!this.password) {
        this.$toast.fail('请输入密码');
        return false
      }
      return true
    }
  },
  created() {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      //如果存在缓存，证明用户是登录状态
      //跳转首页
      this.$router.replace('/home')
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(#68c9b6, #3c80cb);
  .title {
    position: absolute;
    top: 50px;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #ffffff;
  }
  .login_wrap {
    position: absolute;
    top: 190px;
    left: 50%;
    transform: translate(-50%);
    width: 75%;
    .login_form_item {
      width: 100%;
      height: 42px;
      border-radius: 12px;
      margin-bottom: 25px;
      padding-left: 12px;
      padding-right: 12px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.4);
      color: #fff;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-icon{
        font-size: 20px;
      }
      .van-field{
        width: 100%;
        background-color: rgba(0,0,0,0);
        color: #fff;
        font-size: 18px;
      }
    }
  }
  .other_wrap{
    width: 100%;
    height: 30px;
    text-align: center;
    position: absolute;
    bottom: 180px;
    color: #fff;
    font-size: 16px;
  }
}
</style>