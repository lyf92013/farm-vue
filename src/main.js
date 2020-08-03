import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import App from './App.vue'
import router from './router'
import store from './store'
import ToggleButton from 'vue-js-toggle-button'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToggleButton)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyADf2Ss5DEZdZMFEJ0f8fmi1KcYRZMYLZI'
  },
  installComponents: true
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
