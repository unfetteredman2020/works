import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router/index'
import store from './store/index'
import VirtualCollection from 'vue-virtual-collection'
import less from 'less'

Vue.use(less)
Vue.use(ElementUI);
Vue.use(VirtualCollection)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
