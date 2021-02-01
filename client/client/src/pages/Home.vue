<template>
  <div class="home">
    <div class="top_bar">
      <van-search v-model="keyword" shape="round" placeholder="搜索问卷">
      </van-search>
      <van-button type="primary" round size="small" @click="searchDocs">搜一下</van-button>
    </div>

    <div class="docs_list" v-if="docsList.length!=0">

      <div 
        class="docs_item"
        v-for="(item, index) in docsList"
        :key="index"
        @click="handleDocsClick(item._id, item.title, item.status)"
      >
        <div class="docs_left_wrap">
          <div class="docs_title">{{item.title}}</div>
          <div class="docs_status">
            <van-tag plain type="primary" v-if="item.status==0">已发布</van-tag>
            <van-tag plain color="#333" v-if="item.status==1">未发布</van-tag>
          </div>
        </div>
        <div class="docs_right_wrap">
          <div class="docs_item_nums">{{item.responseNums}}</div>
          <span class="docs_item_num_txt">答卷数量</span>
        </div>
      </div>

      <van-popup 
        v-model="docsPopShow"
        round 
        position="bottom" 
        class="docs_pop"
        :style="{ height: '40%' }" 
      >
        <div class="docs_pop_title">
          {{title}}
        </div>
        <div class="docs_pop_fun_wrap">
          <div class="docs_pop_fun_item" v-show="status==0" @click="handleStop">
            <div class="docs_pop_fun_item_icon">
              <van-icon name="pause-circle-o" />
            </div>
            <span class="docs_pop_fun_item_txt">暂停</span>
          </div>

          <div class="docs_pop_fun_item" v-show="status==1" @click="handlePublish">
            <div class="docs_pop_fun_item_icon">
             <van-icon name="play-circle-o" />
            </div>
            <span class="docs_pop_fun_item_txt">发布</span>
          </div>

          <div class="docs_pop_fun_item" @click="handleShare">
            <div class="docs_pop_fun_item_icon">
              <van-icon name="share-o" />
            </div>
            <span class="docs_pop_fun_item_txt">分享</span>
          </div>

          <div class="docs_pop_fun_item" @click="handleDataResult">
            <div class="docs_pop_fun_item_icon">
              <van-icon name="bar-chart-o" />
            </div>
            <span class="docs_pop_fun_item_txt">结果</span>
          </div>

          <div class="docs_pop_fun_item" @click="handleDelDocs">
            <div class="docs_pop_fun_item_icon">
              <van-icon name="delete-o" />
            </div>
            <span class="docs_pop_fun_item_txt">删除</span>
          </div>
        </div>
      </van-popup>
      
    </div>
    <van-empty description="暂无问卷" v-if="docsList.length==0" />

  </div>
</template>

<script>
import util from '../util/index'
import axios from 'axios'

export default {
  name: "Home",
  components: {},
  data() {
    return {
      keyword: "",//搜索关键字
      docsPopShow: false,//问卷弹窗显示/隐藏
      docsList: [],//问卷列表
      id: '',//临时问卷id
      title: '',//临时问卷标题
      status: 0,//临时问卷状态
    };
  },
  methods: {
    //获取自己的问卷列表
    async getDocsList() {
      this.$toast.loading('加载中');
      const result = await axios({
        url: '/api/docs',
        method: 'GET',
        params: {
          id: util.getUserInfo().id
        }
      })
      if (result.data.code == 0) {
        //获取成功
        this.docsList = result.data.data
        this.$toast.clear()
        // console.log(result.data.data);
      } else {
        this.$toast.fail('获取失败，请稍后再试')
      }
    },
    //点击问卷
    handleDocsClick(id, title, status) {
      this.id = id
      this.title = title
      this.status = status
      this.docsPopShow = true 
    },
    //点击暂停 下架问卷
    async handleStop() {
      this.$toast.loading('暂停中');
      const result = await axios({
        url: '/api/docs/updateStatus',
        method: 'post',
        data: {
          status: 1,
          id: this.id
        }
      })
      if (result.data.code == 0) {
        //下架成功
        //重新获取最新数据
        this.getDocsList()
        //模态框隐藏
        this.docsPopShow = false
        //弹窗提示
        this.$toast.success('暂停成功');
      } else {
        this.$toast.fail(result.data.message);
      }
    },
    //点击发布 上架问卷
    async handlePublish() {
      this.$toast.loading('发布中');
      const result = await axios({
        url: '/api/docs/updateStatus',
        method: 'post',
        data: {
          status: 0,
          id: this.id
        }
      })
      if (result.data.code == 0) {
        //发布成功
        //重新获取最新数据
        this.getDocsList()
        //模态框隐藏
        this.docsPopShow = false
        //弹窗提示
        this.$toast.success('发布成功');
      } else {
        this.$toast.fail(result.data.message);
      }
    },
    //分享点击
    handleShare() {
      //判断状态
      if (this.status == 1) {
        //未发布状态
        this.$toast.fail('该问卷未发布');
        return
      } else {
        //去分享页
        this.$router.push({
          path: '/share',
          query: {
            id: this.id,
            title: this.title
          }
        })
      }

    },
    //数据结果点击
    handleDataResult() {
      //去结果页
      this.$router.push({
        path: '/data',
        query: {
          id: this.id
        }
      })
    },
    //删除问卷点击
    async handleDelDocs() {
      this.$toast.loading('删除中');
      const result = await axios({
        url: '/api/docs/del',
        method: 'get',
        params: {
          id: this.id
        }
      })
      if (result.data.code == 0) {
        //删除成功
        //重新获取最新数据
        this.getDocsList()
        //模态框隐藏
        this.docsPopShow = false
        //弹窗提示
        this.$toast.success('删除成功');
      } else {
        this.$toast.fail(result.data.message);
      }
    },
    //搜索问卷
    async searchDocs() {
      if (!this.keyword) {
        //没关键词
        this.$toast.fail('请填写标题');
        return
      }
      this.$toast.loading('搜索中');
      let titleReg = new RegExp(this.keyword, "g")
      let lastDocsList = []

      this.docsList.forEach((item,index)=>{
        let regResult = item.title.match(titleReg)
        if (regResult) {
          //匹配到
          lastDocsList.push(item)
        }
      })
      // console.log(lastDocsList);
      this.docsList = lastDocsList
      this.$toast.clear();
    }
  },
  mounted() {
    let _this = this
    //检查用户登录状态
    util.checkLogin(_this)
    //获取自己的问卷列表
    this.getDocsList()
  }
};
</script>

<style lang="less" scoped>
.home{
  background-color: #eee;
  min-height: 100vh;
  padding-top: 54px;
  padding-bottom: 60px;
  box-sizing: border-box;
  .top_bar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;
    background-color: #fff;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 99;
    .van-search{
      flex: 8;
    }
    .van-button{
      flex: 2;
    }
  }
  .docs_list{
    padding: 10px;
    min-height: 100vh;
    .docs_item{
      width: 100%;
      max-width: 100%;
      height: 110px;
      background-color: #fff;
      border-radius: 8px;
      padding: 22px 10px;
      margin-bottom: 10px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .docs_left_wrap{
        width: 75%;
        height: 100%;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        padding-left: 8px;
        padding-right: 40px;
        box-sizing: border-box;
        .docs_title{
          width: 100%;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          font-size: 18px;
          font-weight: 600;
        }
      }
      .docs_right_wrap{
        width: 25%;
        height: 80%;
        border-left: 1px solid #ccc;
        display: flex;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: center;
        .docs_item_nums{
          color: #008ad3;
          font-size: 22px;
        }
        .docs_item_num_txt{
          font-size: 15px;
          color: #999;
        }
      }
    }
    .docs_pop{
      background-color: #eee;
      padding-top: 10px;
      .docs_pop_title{
        line-height: 40px;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        color: #777;
        text-align: center;
      }
      .docs_pop_fun_wrap{
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding-top: 25px;
        .docs_pop_fun_item{
          display: flex;
          flex-flow: column nowrap;
          justify-content: space-between;
          align-items: center;
          .docs_pop_fun_item_icon{
            background-color: #fff;
            width: 55px;
            height: 55px;
            border-radius: 5px;
            display: flex;
            justify-content: center;
            align-items: center;
            .van-icon{
              color: #666;
              font-size: 32px;
            }
          }
          .docs_pop_fun_item_txt{
            color: #777;
            font-size: 15px;
            margin-top: 6px;
          }
        }
      }
    }
  }
}
</style>
