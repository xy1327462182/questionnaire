import Vue, { createApp } from 'vue';
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

createApp(App).use(router).mount('#app')
