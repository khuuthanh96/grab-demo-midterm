import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from "axios";

import * as VueGoogleMaps from 'vue2-google-maps'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faUnlockAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUser, faUnlockAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(BootstrapVue);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD-0eAWpyN2vKvNtORrbm89YfaSzkcbjf4',
    libraries: 'places, drawing'
  }
})
Vue.prototype.$http = axios;
new Vue({
  render: h => h(App),
}).$mount('#app')
