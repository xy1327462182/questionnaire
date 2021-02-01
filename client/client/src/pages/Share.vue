<template>
  <div class="share">
    <div class="top_bar">分享</div>
    <div class="mask_bg"></div>
    <div class="card">
      <div class="docs_title">{{title}}</div>
      <van-button plain round size="small" type="info" @click="goDetail">查看问卷</van-button>
    </div>
    <div class="link_item">
      <van-icon name="description" class="share_icon" />
      <p class="share_link">http://127.0.0.1:8080/detail?id={{id}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '',
      title: ''
    }
  },
  methods: {
    //去详情页
    goDetail() {
      this.$router.push({
        path: '/detail',
        query: {
          id: this.id
        }
      })
    }
  },
  created() {
    this.id = this.$route.query.id
    this.title = this.$route.query.title
  }
}
</script>

<style lang="less" scoped>
.share{
  min-height: 90vh;
  background-color: #f7f8fa;
  position: relative;
  .top_bar{
    width: 100%;
    height: 38px;
    text-align: center;
    font-size: 18px;
  }
  .mask_bg{
    width: 100%;
    height: 140px;
    background-color: #2b62fa;
    border-bottom-left-radius: 80px;
    border-bottom-right-radius: 80px;
    opacity: .8;
  }
  .card{
    width: 90%;
    min-height: 160px;
    padding-left: 30px;
    padding-top: 20px;
    padding-right: 30px;
    border-radius: 12px;
    background: linear-gradient( 45deg,#cef5fc, #fff);
    box-shadow: 0 8px 12px #ebedf0;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -60px);
    box-sizing: border-box;
    .docs_title{
      font-size: 22px;
      color: #3498db;
      font-weight: 700;
      margin-bottom: 20px;
    }
  }
  .link_item{
    width: 100%;
    height: 50px;
    background-color: #fff;
    border-radius: 6px;
    margin-top: 140px;
    box-shadow: 0 1px 1px #ebedf0;
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    .share_icon{
      font-size: 23px;
      font-weight: 560;
      color:  #2b62fa;
      margin-left: 20px;
      margin-right: 14px;
    }
    .share_link{
      width: auto;
      font-size: 16px;
      color: #666;
    }
  }
}
</style>