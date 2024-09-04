import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import ElementUI from 'element-ui';
import VueLazyload from 'vue-lazyload';

import 'boxicons'
import 'vuesax/dist/vuesax.css' //Vuesax styles
import 'element-ui/lib/theme-chalk/index.css';

import BaiduMap from 'vue-baidu-map'

Vue.config.productionTip = false
new Vue({
  render: h => h(App),
}).$mount('#app')
Vue.use(ElementUI);
Vue.use(Vuesax)

Vue.use(VueLazyload);
Vue.use(BaiduMap, {
  ak: 'I1L1ViM8YJaLASfWpAZfEpLQmIrsjJG0'  
})

