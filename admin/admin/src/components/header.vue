<template>
  <div>
    <div class="top_bar">
      <h1 class="title"><a href="/">问卷调查管理系统</a></h1>
      <div class="user_wrap">
        <el-dropdown trigger="click" @command="handleClick">
          <span class="el-dropdown-link">
            {{ username }}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      username: ''
    };
  },
  methods: {
    async handleClick(command) {
      // console.log(command);
      if (command == "logout") {
        //退出登录
        //调后台接口
        const res = await axios({
          method: 'get',
          url: '/api/users/logout'
        })
        //清除缓存
        window.localStorage.removeItem('username')
        //跳转到登录页
        this.$router.replace({
          path: '/login'
        })
      }
    },
  },
  created() {
    const username = window.localStorage.getItem('username')
    this.username = username
    // console.log(username);
  }
};
</script>

<style lang="less" scoped>
.top_bar {
  height: 60px;
  background: linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .title {
    font-size: 20px;
    color: #fff;
    letter-spacing: 2px;
    background-color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }
  .user_wrap {
    .el-dropdown-link {
      color: #fff;
      cursor: pointer;
      .el-icon-arrow-down {
        font-size: 12px;
      }
    }
  }
}
</style>