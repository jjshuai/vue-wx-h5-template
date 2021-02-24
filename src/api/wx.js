import request from '@/utils/request'

/**
 * @desc 微信验签(sdk用) 生成signature timestamp nonce_str 等
 * @param
 */
export function wxSign(data) {
  return request({
    url: '/api/wechat/jsapi_ticketghjgkh',
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
