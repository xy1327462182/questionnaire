<template>
  <div class="home">
    <Layout>
      <template #aside>
        <Aside :index="current"></Aside>
      </template>

      <template #breadcrumb>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
      </template>

      <template #content>
        <el-row type="flex" class="row-bg" justify="space-around">
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="card_item_header">注册用户数</div>
              <div class="card_item_main">234</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="card_item_header">
               问卷文档数
              </div>
              <div class="card_item_main">234</div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="box-card">
              <div slot="header" class="card_item_header">
               问题总数
              </div>
              <div class="card_item_main">234</div>
            </el-card>
          </el-col>
          
        </el-row>
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "../../components/layout.vue";
import Aside from "../../components/aside.vue";

export default {
  data() {
    return {
      current: "0",
    };
  },
  components: {
    Layout,
    Aside,
  },
};
</script>

<style lang="less" scoped>
.home {
  .box-card{
    .card_item_header{
      height: 20px;
      line-height: 20px;
    }
    .card_item_main{
      line-height: 130px;
    }
  }
}
</style>

