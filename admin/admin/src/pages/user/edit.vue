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
          <el-breadcrumb-item>新增用户</el-breadcrumb-item>
        </el-breadcrumb>
      </template>

      <template #content>
        <div class="user_form">
          <el-form label-width="80px">
            <el-form-item label="用户名">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" required>
              <el-select v-model="form.role" placeholder="请选择">
                <el-option label="普通用户" value="users"> </el-option>
                <el-option label="管理员" value="admin"> </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="手机号" required>
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="密码" required v-if="!id">
              <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button v-if="id" type="primary" @click="onSubEdit"
                >更新</el-button
              >
              <el-button v-if="!id" type="primary" @click="onSubAdd"
                >提交</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </template>
    </Layout>
  </div>
</template>

<script>
import axios from "axios";
import Layout from "../../components/layout.vue";
import Aside from "../../components/aside.vue";

export default {
  data() {
    return {
      current: "1",
      id: "",
      form: {
        username: "",
        role: "users",
        phone: "",
        password: "",
      },
    };
  },
  components: {
    Layout,
    Aside,
  },
  created() {
    const { id } = this.$route.query;
    if (id) {
      //如果有id  则是更新用户信息
      this.id = id;
      //获取该用户信息
      this.getUserObj(id);
    } else {
      //如果没id 则是新增用户
    }
  },
  methods: {
    //添加用户 提交
    async onSubAdd() {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!this.form.phone) {
        this.$message({
          message: "请填写手机号",
          type: "warning",
        });
        return;
      }
      if (!phoneReg.test(this.form.phone)) {
        this.$message({
          message: "手机号不合法",
          type: "warning",
        });
        return;
      }
      if (!this.form.password) {
        this.$message({
          message: "请填写密码",
          type: "warning",
        });
        return;
      }

      try {
        const addUserRes = await axios({
          method: "post",
          url: "/api/users",
          data: this.form,
        });
        if (addUserRes.data.code == 0) {
          //新增成功
          this.$message({
            message: "恭喜你，添加成功",
            type: "success",
          });
          //清空表单值
          this.form = {
            username: "",
            role: "users",
            phone: "",
            password: "",
          };
        } else {
          //新增失败了
          this.$message.error(addUserRes.data.message);
        }
        console.log(addUserRes);
      } catch (e) {
        console.log(e);
        this.$message.error("网络错误，请稍后再试");
      }
    },

    //更新用户 提交
    async onSubEdit() {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/;
      if (!this.form.phone) {
        this.$message({
          message: "请填写手机号",
          type: "warning",
        });
        return;
      }
      if (!phoneReg.test(this.form.phone)) {
        this.$message({
          message: "手机号不合法",
          type: "warning",
        });
        return;
      }
      const result = await axios({
        url: "/api/users/update",
        method: "post",
        data: {
          form: this.form,
        },
      });
      // console.log(result);
      if (result.data.code == 0) {
        //更新成功
        this.$message({
          message: '更新成功',
          type: "success",
        });
        //跳转到用户管理
        this.$router.replace('/user')
      } else {
        this.$message.error(result.data.message);
      }
    },

    //获取用户信息
    async getUserObj(id) {
      const result = await axios({
        url: "/api/users/find",
        method: "GET",
        params: {
          id: id,
        },
      });
      if (result.data.code == 0) {
        // console.log(result.data.data);
        this.form = result.data.data;
      } else {
        this.$message({
          message: "获取信息失败",
          type: "warning",
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.user {
  .user_form {
    width: 65%;
    .el-select {
      width: 100%;
    }
  }
}
</style>