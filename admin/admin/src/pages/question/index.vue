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
              v-model="keyword"
            >
            </el-input>
            <el-button type="primary" plain @click="handleSearch">搜索</el-button>
          </div>
        </div>
        <QuesTable
          :quesList="quesData.list" 
          :loading="loading"
        ></QuesTable>
        <el-pagination 
          background layout="prev, pager, next" 
          :page-size="5"  
          :page-count="quesData.pages"
          :current-page="quesData.page"
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
import QuesTable from "../../components/quesTable";

export default {
  data() {
    return {
      current: "3",
      keyword: "",
      quesData: {
        list: [],
        pages: 0,
        page: 1,
        total: 0,
      },
      loading: true,
    };
  },
  components: {
    Layout,
    Aside,
    QuesTable
  },
  methods: {
    //获取列表分页数据
    async getQuesList(skip, limit) {
      this.loading = true;
      limit = limit || 5;
      let result = await axios({
        url: "/api/ques/list",
        method: "get",
        params: {
          skip: skip,
          limit: limit,
        },
      });
      if (result.data.code == 0) {
        // console.log(result.data);
        //获取到列表数据
        result.data.data.list.forEach((item, index) => {
          item.registerTime = moment(item.registerTime).format(
            "YYYY-MM-DD HH:mm:ss"
          );
          if (item.type==0) {
            item.type = '单选题'
          } else if (item.type==1) {
            item.type = '多选题'
          } else if (item.type==2) {
            item.type = '打分题'
          }else if (item.type==3) {
            item.type = '填空题'
          }

          if (item.must) {
            item.must = '是'
          } else if (!item.must) {
            item.must = '否'
          }
        });
        this.quesData = result.data.data;
        this.loading = false;
        // console.log(this.docsData);
        // console.log(result.data.data);
      } else {
        this.quesData = {
          list: [],
          pages: 0,
          page: 1,
        };
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
      this.getQuesList(skip)
    },
    //搜索点击按钮
    async handleSearch() {
      if (!this.keyword) {
        //如果关键词为空，弹窗警告
        this.$message({
          message: "请输入问题标题查询",
          type: "warning",
        });
        return
      }
      this.loading = true
      //发送搜索请求
      const result = await axios({
        url: '/api/ques/find',
        method: 'get',
        params: {
          keyword: this.keyword
        }
      })
      if (result.data.code == 0) {
        //搜索成功
        //时间格式化处理
        result.data.data.list[0].registerTime = moment(result.data.data.list[0].registerTime).format('YYYY-MM-DD HH:mm:ss')

        if (result.data.data.list[0].type==0) {
            result.data.data.list[0].type = '单选题'
          } else if (result.data.data.list[0].type==1) {
            result.data.data.list[0].type = '多选题'
          } else if (result.data.data.list[0].type==2) {
            result.data.data.list[0].type = '打分题'
          }else if (result.data.data.list[0].type==3) {
            result.data.data.list[0].type = '填空题'
          }

          if (result.data.data.list[0].must) {
            result.data.data.list[0].must = '是'
          } else if (!result.data.data.list[0].must) {
            result.data.data.list[0].must = '否'
          }
        this.quesData = result.data.data
      } else {
        this.$message({
          message: result.data.message,
          type: "warning",
        });
      }
      this.loading = false
    },
  },
  mounted() {
    //获取列表分页数据
    this.getQuesList(0, 5);
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