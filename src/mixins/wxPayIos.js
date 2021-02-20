// ios 微信支付 落地页url 处理
export default {
  data() {
    return {}
  },
  // 解决ios环境 jsapi支付url落地页的问题
  beforeRouteEnter: (to, from, next) => {
    // ios终端
    const agent = navigator.userAgent
    const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
    // 微信环境
    const ua = navigator.userAgent.toLowerCase()
    const isWx = (ua.match(/MicroMessenger/i) || []).includes('micromessenger')

    if (isiOS && isWx && to.path !== location.pathname) {
      window.location.href = location.origin + to.fullPath
      // location.reload()
    } else {
      next()
    }
  }
}
