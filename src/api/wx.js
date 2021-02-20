import request from '@/utils/request'

// !!! 页面中的请求方法中获取数据直接拿到res = res即可 无需res = res.data和判断res.code状态
// !!! 页面中的请求方法中无需在.catch()中弹出报错信息 , request中已处理

/**
 * @desc 微信验签(sdk用) 生成signature timestamp nonce_str 等
 * @param
 */
export function wxSign(data) {
  return request({
    url: '/api/wechat/jsapi_ticket',
    method: 'post',
    data
  })
}

/**
 * @desc 获取微信授权地址(授权用)
 * @param
 */
export function wxRedirectUrl(params) {
  return request({
    url: '/api/wechat/oauth/get_redirect_url',
    method: 'get',
    params
  })
}
