import request from '@/utils/request'

/**
 * @desc 通过微信授权code换取accessToken
 * @param
 */
export function code2AccessToken(params) {
  return request({
    url: '/api/wechat/oauth/user_access_token',
    method: 'get',
    params
  })
}

