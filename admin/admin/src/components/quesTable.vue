<template>
  <el-table :data="userList" v-loading="loading" border style="width: 100%">
    <el-table-column prop="registerTime" label="注册时间" width="160">
    </el-table-column>
    <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
    <el-table-column prop="username" label="用户名" width="100">
    </el-table-column>
    <el-table-column prop="phone" label="手机号" width="180"> </el-table-column>
    <el-table-column prop="role" label="角色" width="100"> </el-table-column>
    <el-table-column label="操作" width="160">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
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
    return {};
  },
  props: {
    userList: {
      type: Array,
      default: [],
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    //编辑
    handleEdit(index, record) {
      let id = record._id;
      // console.log(id);
      //跳到新增用户页
      this.$router.push({
        path: "/user/add",
        query: {
          id: id
        }
      });
    },
    //删除
    async handleDelete(index, record) {
      // console.log(index, record);
      //获取id
      let id = record._id
      // console.log(id);
      //调用父组件的删除方法
      this.$emit('del-user', id)
    },
  },
};
</script>

<style>
</style>