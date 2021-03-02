const state = () => ({
  originUrl: '' // ios环境下 保存一下当前的url
})

// mutations
const mutations = {
  SET_ORIGIN_URL(state, { originUrl }) {
    state.originUrl = originUrl
  }
}

const actions = {
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
