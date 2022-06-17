import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

// bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { SidebarPlugin } from 'bootstrap-vue'

// glide
import VueGlide from 'vue-glide-js'
import 'vue-glide-js/dist/vue-glide.css'
import vuetify from './plugins/vuetify'

Vue.use(BootstrapVue)
Vue.use(VueGlide)
Vue.use(SidebarPlugin)

Vue.config.productionTip = false

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
