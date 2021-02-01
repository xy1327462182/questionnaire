<template>
  <el-table :data="quesList" v-loading="loading" border style="width: 100%">
    <el-table-column prop="registerTime" label="创建时间" width="180">
    </el-table-column>
    <el-table-column prop="phone" label="创建人" width="160"> </el-table-column>
    <el-table-column prop="title" label="问题标题"> </el-table-column>
    <el-table-column prop="type" label="问题类型" width="100"> </el-table-column>
    <el-table-column prop="must" label="问题必填" width="90"> </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    quesList: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style>
</style>