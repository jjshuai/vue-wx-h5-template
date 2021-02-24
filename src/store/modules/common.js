/**
 * 全局公共
 * 1. 显示隐藏全局loading
 */

const state = {
  // 显示隐藏全局loading
  showGlobalMask: false
}

const mutations = {
  SHOW_MASK: state => {
    state.showGlobalMask = true
  },
  CLOSE_MASK: state => {
    state.showGlobalMask = false
  }
}

const actions = {
  // 全局loading
  showMask({ commit }) {
    commit('SHOW_MASK')
  },
  closeMask({ commit }) {
    commit('CLOSE_MASK')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
