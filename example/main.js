import Vue from 'vue'
import App from './App.vue'
import ResizeObserver from '../src/index'

Vue.config.productionTip = false
Vue.use(ResizeObserver)

new Vue({
  render: h => h(App),
}).$mount('#app')
