<template>
  <div class="login">
    <div class="title">Welcome Questionnaire</div>
    <div class="login_wrap">
      <div class="login_form_item">
        <van-icon name="manager-o" />
        <van-field
          v-model="username"
          clearable
          placeholder="请输入用户名"
        />
      </div>
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
      <van-button type="primary" block @click="subRegister">注册</van-button>
    </div>
    <div class="other_wrap" @click="goLogin">
      去登录
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      phone: '',
      username: '',
      password: ''
    }
  },
  methods: {
    //去登录
    goLogin() {
      this.$router.replace('/login')
    },
    //提交注册按钮
    subRegister() {
      const result = this.validate()
      // console.log(result);
      if (result) {
        //验证成功
        this.requestRegister()
      }
    },
    //发送注册请求
    async requestRegister() {
      const res = await axios({
        url: "/api/users",
        method: 'post',
        data: {
          username: this.username,
          phone: this.phone,
          password: this.password
        }
      })
      if (res.data.code == 0) {
        //注册成功
        this.$toast.success(res.data.message);
        //去登录页
        this.goLogin()
      } else {
        this.$toast.fail(res.data.message);
      }
    },
    //验证表单
    validate() {
      if (!this.username) {
        this.$toast.fail('请输入用户名');
        return false
      }
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
    top: 160px;
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
    bottom: 150px;
    color: #fff;
    font-size: 16px;
  }
}
</style>