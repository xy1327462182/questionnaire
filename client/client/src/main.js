import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入vant组件库
import './plugins/index'
import 'vant/lib/index.less';
//计算根元素的font-size
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
