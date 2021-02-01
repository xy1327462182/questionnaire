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
              v-model="keyword"
            >
            </el-input>
            <el-button type="primary" @click="handleSearch" plain>搜索</el-button>
          </div>
          <el-button type="primary" @click="addUser">新增用户</el-button>
        </div>
        <UserTable 
          :userList="userData.list" 
          :loading="loading"
          @del-user="handleDelUser"
        ></UserTable>
        <el-pagination 
          background layout="prev, pager, next" 
          :page-size="5"  
          :page-count="userData.pages"
          :current-page="userData.page"
          @current-change="handlePagination"
        >
        </el-pagination>
      </template>
    </Layout>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import Layout from "../../components/layout.vue";
import Aside from "../../components/aside.vue";
import UserTable from "../../components/userTable";

export default {
  data() {
    return {
      current: "1",
      keyword: "",
      userData: {
        list: [],
        pages: 0,
        page: 1,
        total: 0
      },
      loading: true
    };
  },
  components: {
    Layout,
    Aside,
    UserTable,
  },
  methods: {
    //新增用户
    addUser() {
      //跳到新增用户页
      this.$router.push({
        path: '/user/add'
      })
    },
    //获取用户列表分页数据
    async getUserList(skip, limit) {
      this.loading = true
      limit = limit || 5
      let result = await axios({
        url: '/api/users/list',
        method: 'get',
        params: {
          skip: skip,
          limit: limit
        }
      })
      if (result.data.code == 0) {
        // console.log(result.data);
        //获取到用户列表数据
        result.data.data.list.forEach((item,index)=>{
          item.registerTime = moment(item.registerTime).format('YYYY-MM-DD HH:mm:ss')
        })
        this.userData = result.data.data
        this.loading = false
        // console.log(result.data.data);
      } else {
        this.userData = {
          list: [],
          pages: 0,
          page: 1
        }
      }
    },
    //分页器页码发生变化
    handlePagination(index) {
      // console.log(index);
      let skip = 0
      if (index == 1) {
        //第一页 跳过0条数据查询
        skip = 0
      } else {
        skip = (index - 1) * 5
      }
      //请求数据
      this.getUserList(skip)
    },
    //搜索点击按钮
    async handleSearch() {
      let phoneReg = /^[1][3,4,5,7,8,9][0-9]{9}$/
      if (!this.keyword) {
        //如果关键词为空，弹窗警告
        this.$message({
          message: "请输入手机号查询",
          type: "warning",
        });
        return
      }
      this.keyword = Number(this.keyword)
      if (!phoneReg.test(this.keyword)) {
        //输入手机号格式不正确
        this.$message({
          message: "手机号格式不正确",
          type: "warning",
        });
        return
      }
      this.loading = true
      //发生搜索请求
      const result = await axios({
        url: '/api/users/search',
        method: 'get',
        params: {
          keyword: this.keyword
        }
      })
      if (result.data.code == 0) {
        //搜索成功
        //时间格式化处理
        result.data.data.list[0].registerTime = moment(result.data.data.list[0].registerTime).format('YYYY-MM-DD HH:mm:ss')
        this.userData = result.data.data
      } else {
        this.$message({
          message: result.data.message,
          type: "warning",
        });
      }
      this.loading = false
    },
    //删除用户
    async handleDelUser(id) {
      console.log(id);
      //发送请求
      const result = await axios({
        methods: 'get',
        url: '/api/users/del',
        params: {
          id: id
        }
      })
      if (result.data.code == 0) {
        //删除成功
        this.$message({
          message: result.data.message,
          type: 'success'
        });
        //重新获取数据
        this.getUserList(0)
      } else {
        this.$message.error(result.data.message);
      }
    }
  },
  mounted() {
    //获取用户列表分页数据
    this.getUserList(0, 5)
  }
};
</script>

<style lang="less" scoped>
.user {
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