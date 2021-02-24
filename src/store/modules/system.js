import systemUtils from '@/utils/system'

const getDefaultState = () => {
  return {
    systemType: null, // 平台类型 ios android page wx ali
    thirdType: null, // 是否是第三方平台类型 wx ali
    appId: '', // 如果是第三方平台 设置 appid
    appType: null // 是否是app类型 ios android
  }
}
const state = getDefaultState()

const mutations = {
  INIT_SYSTEM_TYPE(state, { systemType, thirdType, appType, appId }) {
    state.systemType = systemType
    state.thirdType = thirdType
    state.appType = appType
    state.appId = appId
  }
}

const actions = {
  initSystemType({ commit }) {
    const systemType = systemUtils.getUserAgentType()
    console.log('systemType', systemType)
    let thirdType, appType, appId

    // 如果是app
    if (systemType === 'ios' || systemType === 'android') {
      appType = systemType
    }
    // 如果是第三方环境 wx ali
    if (systemType === 'wx' || systemType === 'ali') {
      thirdType = systemType
      // 注: 目前仅适配第三方wx环境,如需其他环境,如ali,可再配置config.js,根据平台类型循环读取appid等配置
      appId = process.env.VUE_APP_APPID
    }

    // 初始化 浏览器、系统平台类型
    commit('INIT_SYSTEM_TYPE', { systemType, thirdType, appType, appId })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
