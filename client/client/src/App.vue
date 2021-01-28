<template>
  <div id="app">
    <TabBar></TabBar>
    <router-view/>
  </div>
</template>

<script>
import TabBar from './components/Tabbar'
export default {
  components: {
    TabBar
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
