<template>
  <div class="login">
    <div class="login_wrap">
      <h2 class="login_title">问卷后台管理系统</h2>
      <div class="err_msg" v-show="errShow">{{errmsg}}</div>
      <el-form label-position="right" label-width="70px">
        <el-form-item label="手机号" required>
          <el-input placeholder="请输入手机号" v-model="phone"></el-input>
        </el-form-item>
        <el-form-item label="密码" required>
          <el-input placeholder="请输入密码" v-model="pwd" show-password></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" :loading="false" @click="handleLogin" >登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      pwd: '',
      errmsg: '',
      errShow: false
    }
  },
  methods: {
    handleLogin() {
      if (!this.phone) {
        this.errmsg = '手机号不能为空',
        this.errShow = true
        return
      }
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!phoneReg.test(this.phone)) {
        this.errmsg = '手机号格式不正确',
        this.errShow = true
        return
      }
      if (!this.pwd) {
        this.errmsg = '密码不能为空',
        this.errShow = true
        return
      }
      let pwdReg = /^\w{3,11}$/
      if (!pwdReg.test(this.pwd)) {
        this.errmsg = '密码格式不正确',
        this.errShow = true
        return
      }
      this.errmsg = ''
      this.errShow = false
      console.log('login。。。');
    }
  }
};
</script>

<style lang="less">
.login {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  background: url(../../assets/login-bg.svg);
  background-color: #264177;
  .login_wrap {
    position: absolute;
    left: 50%;
    top: 70px;
    transform: translate(-50%);
    width: 500px;
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    text-align: center;
    .login_title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 30px;
    }
    .err_msg{
      background-color: #f56c6c;
      border-radius: 5px;
      color: #fff;
      padding: 5px 15px;
    }
    .el-form{
      margin-top: 30px;
    }
    .el-button {
      margin-top: 30px;
    }
  }
}
</style>