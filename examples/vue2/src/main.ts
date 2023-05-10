import Vue from 'vue'
import App from './App.vue'
import Resize from 'v-resize-observer'
// import './assets/main.css'

Vue.use(Resize)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
