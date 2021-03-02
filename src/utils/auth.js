import Cookies from 'js-cookie'

const KeyPrefix = 'vue-wx-h5-template'
const TokenKey = KeyPrefix + 'access-token'
const UserInfoKey = KeyPrefix + 'user-info'
const wxCodeKey = KeyPrefix + 'wx-code'

// token - cookie
function getToken() {
  return Cookies.get(TokenKey)
}

function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 30 })
}

function removeToken() {
  return Cookies.remove(TokenKey)
}

// 用户信息 - session
function getUserInfo() {
  return ['undefined', 'null', ''].includes(sessionStorage.getItem(UserInfoKey)) ? null : JSON.parse(sessionStorage.getItem(UserInfoKey))
}

function setUserInfo(info) {
  const origin = getUserInfo()
  let userInfo = info
  origin ? (userInfo = { ...origin, ...info }) : ''
  return sessionStorage.setItem(UserInfoKey, JSON.stringify(userInfo))
}

function removeUserInfo() {
  return sessionStorage.removeItem(UserInfoKey)
}

// 微信授权code - session
function getWxCode() {
  return ['undefined', 'null', ''].includes(sessionStorage.getItem(wxCodeKey)) ? '' : JSON.parse(sessionStorage.getItem(wxCodeKey))
}

function setWxCode(code) {
  return sessionStorage.setItem(wxCodeKey, JSON.stringify(code))
}

export default {
  getToken,
  setToken,
  removeToken,
  getUserInfo,
  setUserInfo,
  removeUserInfo,
  getWxCode,
  setWxCode
}
