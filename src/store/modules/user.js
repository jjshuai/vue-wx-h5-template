import { getUserInfo } from '@/api/user'
import authUtils from '@/utils/auth.js'
const getDefaultState = () => {
  return {
    token: authUtils.getToken(), // cookie持久化
    userInfo: authUtils.getUserInfo(), // sessionStorage持久化
    wxCode: authUtils.getWxCode() // 微信授权返回的code码 - 解决: 用户授权后该页面仍带着老的code 此时token被清除 beforeEach无法根据是否有code判断是否授权 进入死循环
  }
}
const state = getDefaultState()

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USER_INFO: (state, userInfo) => {
    state.userInfo = {
      ...state.userInfo,
      ...userInfo
    }
  },
  SET_WX_CODE(state, wxCode) {
    state.wxCode = wxCode
  },
  REMOVE_TOKEN: state => {
    state.token = ''
  },
  REMOVE_USER_INFO: state => {
    state.userInfo = null
  }
}

const actions = {
  // 保存token
  setToken({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', data.access_token)
      authUtils.setToken(data.access_token)
      resolve()
    })
  },

  // 获取用户信息
  getUserInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(response => {
          // 保存用户信息
          commit('SET_USER_INFO', response)
          authUtils.setUserInfo(response)
          resolve(response)
        })
        .catch(error => {
          reject(error)
        })
    })
  },

  // 设置用户信息
  setUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      commit('SET_USER_INFO', data)
      authUtils.setUserInfo(data)
      resolve()
    })
  },

  // 退出登录 删除token 清除用户信息
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit('REMOVE_TOKEN')
      authUtils.removeToken()
      commit('REMOVE_USER_INFO')
      authUtils.removeUserInfo()
      resolve()
    })
  },

  // 设置微信授权返回的code码
  setWxCode({ commit }, wxCode) {
    commit('SET_WX_CODE', wxCode)
    authUtils.setWxCode(wxCode)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
