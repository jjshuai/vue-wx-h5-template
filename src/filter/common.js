import store from '../store'
import router from '../router'
const defaultTitle = 'vue-wx-h5-template'
/**
 * @desc 全局处理
 *         1. 遮罩层
 *         2. 修改标题
 */
function doFilter() {
  router.beforeEach((to, from, next) => {
    store.dispatch('common/showMask') // 开启遮罩层
    document.title = to.meta.title ? to.meta.title : defaultTitle // 修改标题
    next()
  })
}

export default {
  doFilter
}
