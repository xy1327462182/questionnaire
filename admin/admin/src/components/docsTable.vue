<template>
  <el-table :data="docsList" v-loading="loading" border style="width: 100%">
    <el-table-column prop="registerTime" label="创建时间" width="180"> </el-table-column>
    <el-table-column prop="phone" label="创建人" width="160"> </el-table-column>
    <el-table-column prop="title" label="问卷标题"> </el-table-column>
    <el-table-column prop="responseNums" label="答卷数量" width="100"> </el-table-column>
    <el-table-column label="操作" width="120">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    docsList: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  methods:{
    handleEdit() {

    },
    //删除
    async handleDelete(index, record) {
      //获取id
      let id = record._id
      // console.log(id);
      //调用父组件的删除方法
      this.$emit('del-docs', id)
    },
  }
};
</script>

<style>
</style>