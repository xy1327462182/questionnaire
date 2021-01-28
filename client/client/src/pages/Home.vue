<template>
  <div class="home">
    <div class="top_bar">
      <van-search v-model="aaa" shape="round" placeholder="搜索问卷">
      </van-search>
      <van-button type="primary" round size="small">搜一下</van-button>
    </div>

    <div class="docs_list">
      <div class="docs_item">
        <div class="docs_left_wrap">
          <div class="docs_title">关于问卷调查的使用情况啊1231221312</div>
          <div class="docs_status"><van-tag plain type="primary">已发布</van-tag></div>
        </div>
        <div class="docs_right_wrap">
          <div class="docs_item_nums">82</div>
          <span class="docs_item_num_txt">答卷数量</span>
        </div>
      </div>
      <div class="docs_item">
        <div class="docs_left_wrap">
          <div class="docs_title">关于问卷调查的使用情况啊1231221312</div>
          <div class="docs_status"><van-tag plain type="primary">已发布</van-tag></div>
        </div>
        <div class="docs_right_wrap">
          <div class="docs_item_nums">82</div>
          <span class="docs_item_num_txt">答卷数量</span>
        </div>
      </div>
      <div class="docs_item">
        <div class="docs_left_wrap">
          <div class="docs_title">关于问卷调查的使用情况啊1231221312</div>
          <div class="docs_status"><van-tag plain type="primary">已发布</van-tag></div>
        </div>
        <div class="docs_right_wrap">
          <div class="docs_item_nums">82</div>
          <span class="docs_item_num_txt">答卷数量</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '../util/index'

export default {
  name: "Home",
  components: {},
  data() {
    return {
      aaa: "",
    };
  },
  methods: {
    
  },
  created() {
    let _this = this
    //检查用户登录状态
    util.checkLogin(_this)
    
  }
};
</script>

<style lang="less" scoped>
.home{
  background-color: #eee;
  padding-top: 54px;
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
  }
}
</style>
