<template>
  <div>
    <el-menu
      :defaultActive="index"
      class="el-menu-vertical-demo"
      background-color="#f8f9fa"
      text-color="#333"
      active-text-color="#409eff"
    >
      <router-link to="/user">
        <el-menu-item index="1">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
      </router-link>

      <router-link to="/docs">
        <el-menu-item index="2">
          <i class="el-icon-s-claim"></i>
          <span slot="title">问卷中心</span>
        </el-menu-item>
      </router-link>

      <router-link to="/question">
        <el-menu-item index="3">
          <i class="el-icon-question"></i>
          <span slot="title">问题配置</span>
        </el-menu-item>
      </router-link>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    index: {
      type: String,
      default: "1",
    },
  },
};
</script>

<style lang="less">
.el-menu-vertical-demo{
  width: 200px;
  border: 0!important;
  .el-menu-item{
    width: 200px;
  }
}
</style>