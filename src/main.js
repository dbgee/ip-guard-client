import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vueaxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(Vueaxios,axios)

new Vue({
  render: h => h(App),
}).$mount('#app')
