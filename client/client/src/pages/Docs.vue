<template>
  <div class="docs">
    <div class="add_docs_wrap">
      <p class="docs_title_wrap"><span class="docs_title_icon">* </span>问卷名称</p>
      <textarea id="docs_title" placeholder="请输入名称"></textarea>
      <van-button type="primary" round block>创建问卷</van-button>
    </div>
  </div>
</template>

<script>
import util from '../util/index'

export default {
  data() {
    return {
      message: ''
    }
  },
  created() {
    let _this = this
    //检查用户登录状态
    util.checkLogin(_this)
    
  }
};
</script>

<style lang="less" scoped>
.docs{
  padding-top: 10px;
  padding-left: 10px;
  padding-right: 10px;
  .add_docs_wrap{
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    .docs_title_wrap{
      font-size: 18px;
      .docs_title_icon{
        color: #f52e2a;
      }
    }
    #docs_title{
      resize: none;
      height: 100px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-bottom: 30px;
      font-size: 18px;
      padding: 12px;
      box-sizing: border-box;
    }
  }
}
</style>