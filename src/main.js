// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/index'
import $ from 'jquery'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import less from 'less'
import moment from 'moment'
import echarts from 'echarts'

import axios from 'axios'
Vue.prototype.$moment = moment
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios;
moment.locale('zh-cn');//汉化


Vue.use(less)
Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
