import Vue from 'vue'
import App from './App.vue'
import Vuesax from 'vuesax'
import 'boxicons'

import 'vuesax/dist/vuesax.css' //Vuesax styles

Vue.config.productionTip = false




new Vue({
  render: h => h(App),
}).$mount('#app')
Vue.use(Vuesax)
