import store from '@/store'
import wxUtils from './weixin'

// 系统环境 wx ali page
const system = store.getters.thirdType || 'page'

/**
 * @desc 开始支付
 * @param {*} data
 */
function payMent(data) {
  const { type } = data
  const payType = [
    {
      type: 'wx',
      fn: handlePayWx
    },
    {
      type: 'ali',
      fn: handlePayAli
    }
  ]
  const fn = payType.find(val => val.type === type).fn
  fn(data)
}

/**
 * @desc 微信支付
 * @param {*} data
 */
function handlePayWx(data) {
  if (system === 'wx') {
    // jsapi支付
    wxUtils.pay(data)
  } else if (system === 'page') {
    // h5支付
    // 调接口 window.loaction.href = 'www.baidu.com'
  }
}

/**
 * @desc 阿里支付
 * @param {*} data
 */
function handlePayAli(data) {
  console.log('阿里支付')
}

export default {
  // 支付
  payMent
}
