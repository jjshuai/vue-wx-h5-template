// import authUtils from '@/utils/auth' // getToken, setToken, removeToken,getUserInfo,setUserInfo,removeUserInfo

const getters = {
  // 全局变量
  mask: state => state.common.showGlobalMask, // 全局mask
  originUrl: state => state.wxSign.originUrl, // 当前url地址 ios环境下

  // 系统
  thirdType: state => state.system.thirdType, // 是否是第三方平台类型 微信wx 阿里ali
  appId: state => state.system.appId, // 三方应用的appid

  // 用户
  token: state => { // token - cookie 持久
    return state.user.token
  },
  userInfo: state => { // 用户信息 - session 防刷新,关闭页面会被清除
    return state.user.userInfo
  }
}

export default getters
