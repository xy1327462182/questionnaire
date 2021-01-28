<template>
  <div class="docs">
    <Layout>
      <template #aside>
        <Aside :index="current"></Aside>
      </template>

      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>问题配置</el-breadcrumb-item>
        </el-breadcrumb>
      </template>

      <template #content>
        <div class="user_opa_wrap">
          <div class="search_wrap">
            <span class="label">搜索问题</span>
            <el-input
              placeholder="请输入关键词搜索"
              prefix-icon="el-icon-search"
              v-model="aaa"
            >
            </el-input>
            <el-button type="primary" plain>搜索</el-button>
          </div>
          <el-button type="primary">添加问题</el-button>
        </div>
        <QuesTable></QuesTable>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/layout.vue";
import Aside from "../../components/aside.vue";
import QuesTable from "../../components/quesTable";

export default {
  data() {
    return {
      current: "3",
      aaa: "",
    };
  },
  components: {
    Layout,
    Aside,
    QuesTable
  },
};
</script>


<style lang="less" scoped>
.docs {
  .user_opa_wrap {
    width: 100%;
    height: 60px;
    padding: 0 15px;
    border: 1px solid #efefef;
    border-radius: 6px;
    background-color: #f0f9eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    box-sizing: border-box;
    .search_wrap {
      width: 50%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        width: 30%;
      }
      .el-button{
        margin-left: 16px;
      }
    }
  }
  .el-pagination{
    margin-top: 30px;
  }
}
</style>