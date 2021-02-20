import router from '../router'
import authUtils from '@/utils/auth'

/**
 * @desc 页面进入权限
 *
 */
function doFilter() {
  router.beforeEach(async(to, from, next) => {
    const hasToken = authUtils.getToken() // token
    const pathList = ['/sign_in']
    // 已登录不能去注册页
    if (hasToken && pathList.includes(to.path)) {
      return next({ path: '/' })
    } else {
      return next()
    }
  })
}

export default {
  doFilter
}
