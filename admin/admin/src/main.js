import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入初始化样式文件
import './assets/style/index.css'
//引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

//引入element-ui组件
import './plugins'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
