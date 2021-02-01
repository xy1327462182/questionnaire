<template>
  <div class="user">
    <div class="title">个人中心</div>
    <div class="cells_wrap">
      <van-cell-group>
        <van-cell
          icon="manager"
          @click="usernameShow = !usernameShow"
          title="用户名"
          size="large"
          :value="username"
          is-link
        />
        <van-popup
          v-model="usernameShow"
          position="bottom"
          round
          :style="{ height: '70%' }"
        >
          <div class="uname_wrap">
            <van-field
              v-model="newUserName"
              label="用户名"
              placeholder="请输入用户名"
            />
            <van-button class="sub_btn" type="primary" block @click="updateUserName">保存</van-button>
          </div>
        </van-popup>
        <van-cell
          icon="phone"
          @click="phoneShow = !phoneShow"
          title="手机号"
          size="large"
          :value="phone"
          is-link
        />
        <van-popup
          v-model="phoneShow"
          position="bottom"
          round
          :style="{ height: '70%' }"
        >
          <div class="uname_wrap">
            <van-field
              v-model="newPhone"
              type="tel" label="手机号"
              placeholder="请输入手机号"
            />
            <van-button class="sub_btn" type="primary" block @click="updatePhone">保存</van-button>
          </div>
        </van-popup>
        <van-cell
          @click="goListPage"
          icon="comment"
          title="我填过的问卷"
          size="large"
          is-link
        />
      </van-cell-group>
      <van-cell-group>
        <van-cell
          @click="aboutShow = !aboutShow"
          icon="star"
          title="关于我们"
          size="large"
          is-link
        />
        <van-popup
          v-model="aboutShow"
          position="bottom"
          round
          :style="{ height: '30%' }"
        >
          <div class="about_txt">
            本应用是一个问卷调查系统，用户可以免费注册使用，发布问卷，手动配置所需得问题信息。
          </div>
        </van-popup>
      </van-cell-group>
    </div>
    <div class="logout_wrap">
      <van-button type="danger" @click="handleSignout" block>注销登录</van-button>
    </div>
  </div>
</template>

<script>
import util from '../util/index'
import axios from 'axios'

export default {
  data() {
    return {
      aboutShow: false,
      usernameShow: false,
      phoneShow: false,
      id: '',
      username: '',
      newUserName: '',
      phone: '',
      newPhone: ''
    };
  },
  methods: {
    //注销
    async handleSignout() {
      //发送请求
      const result = await axios({
        url: '/api/users/logout'
      })
      if (result.data.code == 0) {
        //注销成功
        //弹窗提示
        this.$toast.success('注销成功');
        //清除缓存数据
        util.delUserInfo('userInfo')
        //跳转到登录页
        this.$router.replace('/login')
      }
    },
    //获取用户信息
    getUserInfo() {
      const userInfo = util.getUserInfo()
      // console.log(userInfo);
      this.username = userInfo.username
      this.phone = userInfo.phone
      this.id = userInfo.id
    },
    //更新用户名
    async updateUserName() {
      if (!this.newUserName) {
        this.$toast.fail('请输入用户名');
        return
      }
      if (this.newUserName == this.username) {
        this.$toast.fail('与现名字重复');
        return
      }
      this.$toast.loading('更新中');
      const result = await axios({
        url: '/api/users/updateUsername',
        method: 'post',
        data: {
          username: this.newUserName,
          id: this.id
        }
      })
      // console.log(result);
      if (result.data.code == 0) {
        //更新成功
        this.$toast.success(result.data.message);
        //更新缓存中的用户信息
        util.updateUserInfo('username', this.newUserName)
        //更新本页中的临时数据信息
        this.username = this.newUserName
        //清空表单值
        this.newUserName = ''
      } else {
        //更新失败
        this.$toast.fail(result.data.message);
      }
    },
    //更新手机号
    async updatePhone() {
      if (!this.newPhone) {
        this.$toast.fail('请输入手机号');
        return
      }
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!phoneReg.test(this.newPhone)) {
        this.$toast.fail('手机号格式不正确');
        return
      }
      if (this.newPhone == this.phone) {
        this.$toast.fail('与现手机号重复');
        return
      }
      //发送请求
      this.$toast.loading('更新中');
      const result = await axios({
        url: '/api/users/updatePhone',
        method: 'post',
        data: {
          id: this.id,
          phone: this.newPhone
        }
      })
      if (result.data.code == 0) {
        //更新成功
        this.$toast.success(result.data.message);
        //更新缓存中的用户信息
        util.updateUserInfo('phone', this.newPhone)
        //更新本页中的临时数据信息
        this.phone = this.newPhone
        //清空表单值
        this.newPhone = ''
      } else {
        //更新失败
        this.$toast.fail(result.data.message);
      }
    },
    //填过的问卷列表页
    goListPage() {
      this.$router.push('/list')
    }
  },
  mounted() {
    let _this = this
    //检查用户登录状态
    util.checkLogin(_this)
    //获取用户信息
    this.getUserInfo()
  }
};
</script>

<style lang="less" scoped>
.user {
  padding-top: 10px;
  min-height: 90vh;
  background-color: #eee;
  .title {
    width: 100%;
    height: 38px;
    text-align: center;
    font-size: 18px;
  }
  .cells_wrap {
    .uname_wrap {
      padding-top: 40px;
      padding-left: 20px;
      padding-right: 20px;
      font-size: 18px;
      color: #999;
      .sub_btn {
        margin-top: 30px;
      }
    }
    .about_txt {
      padding: 20px;
      font-size: 16px;
      color: #999;
      text-indent: 2em;
    }
  }
  .logout_wrap{
    margin-top: 30px;
  }
}
</style>