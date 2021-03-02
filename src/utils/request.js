import axios from 'axios'
import store from '@/store'
import { Toast } from 'vant'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers['Accept'] = 'application/json'
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  response => {
    const res = response.data

    if (res && res.code === 0) {
      return res.data
    } else {
      // token失效
      if (res.code === 200201 || res.code === 200202 || res.code === 200103) {
        store.dispatch('user/logout').then(() => {
          location.reload()
        })
      } else {
        // 弹窗提示错误信息
        Toast({
          message: res.msg,
          position: 'middle'
        })
      }
      return Promise.reject(res)
    }
  },
  error => {
    // 弹窗提示错误信息
    Toast({
      message: error.msg || '网络错误',
      position: 'middle'
    })
    console.error(error)
    return Promise.reject(error)
  }
)

export default service
