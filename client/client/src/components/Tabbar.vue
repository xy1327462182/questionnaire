<template>
  <div class="tab_bar">
    <van-tabbar 
      fixed
      border
      route
      v-model="active"
      z-index="99"
      active-color="#07c160" 
    >
      <van-tabbar-item 
        name="home" 
        icon="wap-home-o"
        to="/home"
      >首页</van-tabbar-item>
      <van-tabbar-item 
        name="search" 
        icon="orders-o"
        to="/docs"  
      >问卷</van-tabbar-item>
      <van-tabbar-item 
        name="user" 
        icon="user-o"
        to="/user"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      active: 'home'
    }
  },
};
</script>

<style lang="less">
</style>