import Vue from 'vue'
import App from './Index.vue'
import './css/index.css';
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
