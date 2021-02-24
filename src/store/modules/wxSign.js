const state = () => ({
  originUrl: null, // ios环境下 保存一下当前的url
  timestamp: null,
  nonceStr: null,
  signature: null
})

// mutations
const mutations = {
  SET_SIGN_INFO(state, { timestamp, nonceStr, signature }) {
    state.timestamp = timestamp
    state.nonceStr = nonceStr
    state.signature = signature
  },
  RESET_SIGN_INFO(state) {
    state.timestamp = null
    state.nonceStr = null
    state.signature = null
  },
  SET_ORIGIN_URL(state, { originUrl }) {
    state.originUrl = originUrl
  }
}

const actions = {
  setSignInfo({ commit }, { timestamp, nonceStr, signature }) {
    commit('RESET_SIGN_INFO')
    commit('SET_SIGN_INFO', {
      timestamp,
      nonceStr,
      signature
    })
  },
  setOriginUrl({ commit }, originUrl) {
    return new Promise((resolve, reject) => {
      commit('SET_ORIGIN_URL', { originUrl })
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
