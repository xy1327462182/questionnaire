<template>
  <div class="list">
    <div class="top_bar">已填问卷</div>
    <div class="list_content">
      <div class="item" v-for="item in list" :key="item.documentId" @click="goDetail(item.documentId)">
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import util from "../util/index";

export default {
  data() {
    return {
      list: [],//列表
    };
  },
  methods: {
    async getList() {
      this.$toast.loading("获取中");
      const result = await axios({
        url: "/api/users/find",
        method: "get",
        params: {
          id: util.getUserInfo().id,
        },
      });
      if (result.data.code == 0) {
        //获取成功
        //列表数组去重
        let docsList = result.data.data.docsList
        let resultList = []
        let idList = [] 
        docsList.forEach((item,index)=>{
          if (idList.indexOf(item.documentId) == -1) {
            idList.push(item.documentId)
            resultList.push(item)
          }
        })
        this.list = resultList
        this.$toast.clear();
      } else {
        this.$toast.fail("网络错误，稍后再试");
      }
    },
    //去详情页
    goDetail(id) {
      this.$router.push({
        path: '/detail',
        query: {
          id: id
        }
      })
    }
  },
  mounted() {
    //获取信息列表
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.list {
  background-color: #eee;
  min-height: 90vh;
  .top_bar {
    background-color: #fff;
    width: 100%;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }
  .list_content {
    .item {
      box-sizing: border-box;
      width: 90%;
      margin-left: 5%;
      margin-top: 22px;
      padding: 10px 15px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 8px 12px #ebedf0;
      display: flex;
      align-items: center;
    }
  }
}
</style>