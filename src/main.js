import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from 'axios'
import config from './config'
// import VueAxios from 'vue-axios' 
// Vue.use(VueAxios, axios)

Vue.config.productionTip = false

const apiUrl = process.env.NODE_ENV === 'production' ? config.apiUrl.prod : config.apiUrl.dev
console.log('using api url', apiUrl)
Vue.prototype.$http = Axios.create({baseURL: apiUrl});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')