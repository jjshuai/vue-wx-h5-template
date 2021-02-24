export default {
  // 获取平台类型
  getUserAgentType() {
    const ua = navigator.userAgent.toLowerCase()
    let type = 'page'
    if (ua.indexOf('app_ios') !== -1) {
      type = 'ios'
    } else if (ua.indexOf('app_android') !== -1) {
      type = 'android'
    } else if ((ua.match(/MicroMessenger/i) || []).includes('micromessenger')) {
      type = 'wx'
    } else if ((ua.match(/AlipayClient/i) || []).includes('alipayclient')) {
      type = 'alipay'
    }
    return type
  },
  getDomain() {
    return window.location.host
  },
  // 截取url中的参数
  getUrlParams() {
    const url = window.location.search
    this.winUrl = url
    const theRequest = {}
    if (url.indexOf('?') !== -1) {
      const str = url.substr(1)
      const strs = str.split('&')
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split('=')[0]] = strs[i].split('=')[1]
      }
    }
    return theRequest
  }
}
