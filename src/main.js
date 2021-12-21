import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false
VueClipboard.config.autoSetContainer = true

Vue.use(ElementUI)
Vue.use(Vueaxios,axios)
Vue.use(VueClipboard)

new Vue({
  render: h => h(App),
}).$mount('#app')
