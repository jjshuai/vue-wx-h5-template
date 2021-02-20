import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'
import filter from './filter'

import 'babel-polyfill' // ES6转ES5
import 'normalize.css/normalize.css' //  重置样式
import '@/assets/style/index.scss' // 全局样式

import Debounce from '@/components/debounce' // 防抖自定义组件

import '@/plugins/vant' // 按需引入UI库 vant

// 全局自定义指令
// eslint-disable-next-line
import directive from './directive'

Vue.component('Debounce', Debounce) // 防抖组件

if (process.env.VUE_APP_USE_VCONSOLE === 'true') {
  // vconsole
  const vConsole = require('vconsole')
  // eslint-disable-next-line
  const vconsole = new vConsole()
}

Vue.prototype.$log = window.console.log // template模板中使用$log()

store.dispatch('system/initSystemType') // 初始化系统平台类型

Vue.config.productionTip = false

// 全局过滤处理
filter.doFilters()

Vue.mixin({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      setTimeout(() => {
        store.dispatch('common/closeMask')
      }, 500)
    })
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
