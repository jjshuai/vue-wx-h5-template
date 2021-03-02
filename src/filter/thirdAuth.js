import router from '../router'
import store from '../store'
import authUtils from '@/utils/auth'
import systemUtils from '@/utils/system'
/**
 * @desc token 用户信息；拉起授权判断
 *
 */
function doFilter() {
  router.beforeEach((to, from, next) => {
    const thirdType = store.getters.thirdType // 第三方类型环境 wx ali
    const third_redirect_code = systemUtils.getUrlParams().code || systemUtils.getUrlParams().auth_code // 第三方授权时页面带的code码
    const old_third_redirect_code = store.state.user.wxCode // 第三方授权时页面带的code码 (上一次)
    const hasToken = authUtils.getToken() // token
    const hasUserInfo = authUtils.getUserInfo() // 用户信息

    if (!to.meta.auth) {
      return next()
    }

    //  第三方环境处理 wx/ali
    if (thirdType && to.meta.thirdAuth) {
      if (hasToken) {
        if (hasUserInfo) {
          return next()
        } else {
          store
            .dispatch('user/getUserInfo')
            .then(() => {
              return next()
            })
            .catch(() => {
              return next()
            })
        }
      } else {
        // 已经拿到code(old_third_redirect_code 防止失效code仍在url中,需重新拿到third_redirect_code)
        if (third_redirect_code && third_redirect_code !== old_third_redirect_code) {
          return next()
        }

        // 拉起第三方授权页
        const redirect_url = getThirdUrl(to)
        window.location.href = redirect_url
      }
    } else if (!thirdType) {
      //  浏览器环境处理
      if (hasToken) {
        if (hasUserInfo) {
          return next()
        } else {
          store
            .dispatch('user/getUserInfo')
            .then(() => {
              return next()
            })
            .catch(() => {
              return next()
            })
        }
      } else if (to.path === '/sign_in') {
        return next()
      } else {
        return next({ path: '/sign_in' })
      }
    } else {
      return next()
    }
  })
}

/**
 * @desc 拼接授权页地址
 *
 */
function getThirdUrl(to) {
  let redirect_url = ''
  // wx
  if (store.getters.thirdType === 'wx') {
    if (to.meta.thirdAuth === 'base') {
      redirect_url =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        store.getters.appId +
        '&redirect_uri=' +
        encodeURIComponent(process.env.VUE_APP_BASEURL + process.env.VUE_APP_BASE_PUBLIC_PATH + to.fullPath) +
        '&response_type=code&scope=snsapi_base&state=' +
        process.env.VUE_APP_STATE +
        '#wechat_redirect'
    } else if (to.meta.thirdAuth === 'userinfo') {
      redirect_url =
        'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
        store.getters.appId +
        '&redirect_uri=' +
        encodeURIComponent(process.env.VUE_APP_BASEURL + process.env.VUE_APP_BASE_PUBLIC_PATH + to.fullPath) +
        '&response_type=code&scope=snsapi_userinfo&state=' +
        process.env.VUE_APP_STATE +
        '#wechat_redirect'
    }
  } else if (store.getters.thirdType === 'ali') {
    // ali
    if (to.meta.thirdAuth === 'base') {
      redirect_url =
        'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' +
        store.getters.appId +
        '&auth_skip=false&scope=auth_base&redirect_uri=' +
        encodeURIComponent(process.env.VUE_APP_BASEURL + process.env.VUE_APP_BASE_PUBLIC_PATH + to.fullPath) +
        '&state=1'
    } else if (to.meta.thirdAuth === 'userinfo') {
      redirect_url =
        'https://openauth.alipay.com/oauth2/publicAppAuthorize.htm?app_id=' +
        store.getters.appId +
        '&auth_skip=false&scope=auth_userinfo&redirect_uri=' +
        encodeURIComponent(process.env.VUE_APP_BASEURL + process.env.VUE_APP_BASE_PUBLIC_PATH + to.fullPath) +
        '&state=1'
    }
  }
  return redirect_url
}

export default {
  doFilter
}
