<template>
  <div class="user">
    <Layout>
      <template #aside>
        <Aside :index="current"></Aside>
      </template>

      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </template>

      <template #content>
        <div class="user_opa_wrap">
          <div class="search_wrap">
            <span class="label">搜索用户</span>
            <el-input
              placeholder="请根据手机号搜索"
              prefix-icon="el-icon-search"
              v-model="aaa"
            >
            </el-input>
            <el-button type="primary" plain>搜索</el-button>
          </div>
          <el-button type="primary">新增用户</el-button>
        </div>
        <UserTable></UserTable>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/layout.vue";
import Aside from "../../components/aside.vue";
import UserTable from "../../components/userTable";

export default {
  data() {
    return {
      current: "1",
      aaa: "",
    };
  },
  components: {
    Layout,
    Aside,
    UserTable,
  },
};
</script>

<style lang="less" scoped>
.user {
  .user_opa_wrap {
    width: 100%;
    height: 60px;
    border: 1px solid #efefef;
    border-radius: 6px;
    background-color: #f0f9eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    .search_wrap {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        width: 30%;
      }
      .el-button {
        margin-left: 10px;
      }
    }
  }
  .el-pagination{
    margin-top: 45px;
  }
}
</style>