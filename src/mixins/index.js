import Vue from 'vue'
import store from '../store'

// 全局混入
Vue.mixin({
  beforeRouteEnter(to, from, next) {
    next(vm => {
      setTimeout(() => {
        store.dispatch('common/closeMask')
      }, 500)
    })
  }
})
