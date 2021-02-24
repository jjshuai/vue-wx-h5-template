import request from '@/utils/request'

/**
 * @desc 微信授权code换取accessToken
 * @param
 */
export function code2AccessToken(params) {
  return request({
    url: '/api/wechat/oauth/user_access_token',
    method: 'get',
    params
  })
}

/**
 * @desc 获取用户信息
 * @param
 */
export function getUserInfo(params) {
  return request({
    url: '/api/wechat/oauth/get_user_info',
    method: 'get',
    params
  })
}
