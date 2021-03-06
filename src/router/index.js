import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
import Home from '@/views/home'

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false, // 需要登录
      thirdAuth: 'base', // '': 无需鉴权 base: 静默授权 userinfo: 用户点击授权
      wx: {
        sign: true, // 是否需要微信验签
        jsApiList: [
          'updateAppMessageShareData', // 分享朋友
          'updateTimelineShareData', // 分享朋友圈
          'getLocation', // 定位
          'openLocation' // 打开地图
        ]
      },
      keepAlive: false,
      title: 'HOME'
    }
  },

  {
    path: '/sign_in',
    name: 'Home',
    component: () => import('@/views/signIn/index'),
    meta: {
      auth: false,
      thirdAuth: '',
      wx: {
        sign: true,
        jsApiList: ['getLocation']
      },
      keepAlive: false,
      title: '登录'
    }
  },

  // 404
  {
    path: '*',
    component: () => import('@/views/404'),
    meta: {
      title: '错误'
    }
  }
]

const createRouter = () =>
  new Router({
    mode: 'history',
    // base: '/',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: routes
  })

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router
