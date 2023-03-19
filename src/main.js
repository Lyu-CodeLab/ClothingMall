import Vue from 'vue'
import App from './App.vue'
import router from "./router"
import store from "./store";

import Fastclick from 'fastclick'
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue();
Vue.use(VueLazyload,{
  loading:require('assets/img/common/loading.gif')
})
//无法监听双击
// Fastclick.attach(document.body)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

