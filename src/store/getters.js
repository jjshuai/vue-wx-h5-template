const getters = {
  mask: state => state.common.showGlobalMask, // 全局mask
  originUrl: state => state.wxSign.originUrl, // 当前url地址 ios环境下

  thirdType: state => state.system.thirdType, // 是否是第三方平台类型 微信wx 阿里ali
  appId: state => state.system.appId, // 三方应用的appid

  token: state => state.user.token,
  userInfo: state => state.user.userInfo
}

export default getters
