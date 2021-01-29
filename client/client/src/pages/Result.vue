<template>
  <div class="result">
    <div class="success_icon_wrap">
      <van-icon name="checked" class="success_icon"/>
    </div>
    <p class="success_txt">发布成功</p>
    <div class="btn_wrap">
      <van-button type="info" block @click="goHomePage">返回问卷列表</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    goHomePage() {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.result{
  padding-top: 50px;
  .success_icon_wrap{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .success_icon{
      color: #07c160;
      font-size: 100px;
    }
  }
  .success_txt{
    color: #777;
    font-size: 22px;
    font-weight: 600;
    text-align: center;
  }
  .btn_wrap{
    padding-left: 30px;
    padding-right: 30px;
    margin-top: 60px;
  }
}
</style>