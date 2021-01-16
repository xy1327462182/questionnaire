<template>
  <div class="layout">
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <slot name="aside"></slot>
        </el-aside>
        <el-main>
          <slot name="breadcrumb"></slot>
          <el-card class="box-card" id="content_box">
            <slot name="content"></slot>
          </el-card>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "./header.vue";

export default {
  components: {
    Header,
  },
};
</script>

<style lang="less" scoped>
.el-header {
  background: linear-gradient(45deg, #1278f6, #00b4aa 50%, #1278f6);
  color: #333;
  text-align: center;
  padding: 0;
}

.el-aside {
  height: 100vh;
  background-color: #f8f9fa;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  #content_box{
    width: 100%;
    height: 80vh;
    margin-top: 20px;
    padding: 20px;
    box-sizing: border-box;
  }
}

body > .el-container {
  margin-bottom: 40px;
}
</style>