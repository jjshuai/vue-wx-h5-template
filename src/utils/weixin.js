import wx from 'weixin-js-sdk'
import store from '@/store'
import { wxSign } from '@/api/wx'

const agent = navigator.userAgent
const isiOS = !!agent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios手机
const wxSignParams = {
  signUrl: '',
  timestamp: '',
  nonceStr: '',
  signature: '',
  errorCount: 3 // 错误尝试次数
}

/**
 * @desc 获取参数 初始sdk配置
 * @param {*} params
 */
function init(params) {
  wxSignParams.signUrl = isiOS ? window.location.href : window.location.href //
  if (store.getters.thirdType === 'wx') {
    // 获取验签参数
    return wxSign({
      uri: wxSignParams.signUrl
    })
      .then(res => {
        wxSignParams.timestamp = res.timestamp
        wxSignParams.nonceStr = res.nonce_str
        wxSignParams.signature = res.signature
        wxConfig(params)
      })
      .catch(error => {
        console.log('wxSign fail', error)
      })
  }
}

/**
 * @desc sdk配置
 * @param {*} params
 */
function wxConfig(params) {
  const configObj = {
    debug: false,
    appId: store.getters.appId,
    timestamp: wxSignParams.timestamp,
    nonceStr: wxSignParams.nonceStr,
    signature: wxSignParams.signature,
    jsApiList: params.apiList
  }
  wx.config(configObj)
  wx.error(res => {
    console.log('wx.config fail', res)
    if (wxSignParams.errorCount >= 0) {
      wxSignParams.errorCount = wxSignParams.errorCount - 1
      wxSignParams.signUrl = window.location.href.indexOf('?') === -1 ? window.location.href : window.location.href
      init(params)
    }
  })
}

/**
 * @desc 微信支付
 * @param {*} params
 */
function pay(params) {
  return new Promise(resolve => {
    wx.chooseWXPay({
      timestamp: params.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
      nonceStr: params.nonce_str, // 支付签名随机串，不长于 32 位
      package: params.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
      signType: params.sign_type, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
      paySign: params.pay_sign, // 支付签名

      success: function(res) {
        resolve({ success: res })
      },
      cancel: function(res) {
        resolve('cancel', res)
      },
      fail: function(res) {
        resolve('fail', res)
      }
    })
  })
}

/**
 * @desc 微信分享
 */
function share(params) {
  wx.ready(() => {
    wx.updateAppMessageShareData({
      title: params.title, // 分享标题
      desc: params.desc, // 分享描述
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function(res) {
        // 设置成功
      }
    })
    wx.updateTimelineShareData({
      title: params.title, // 分享标题
      link: params.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: params.imgUrl, // 分享图标
      success: function(res) {
        // 设置成功
      }
    })
  })
}

/**
 * @desc 获取地理位置
 * @param {*} params
 */
function getLocation() {
  return new Promise(resolve => {
    wx.ready(() => {
      wx.getLocation({
        type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
        success: function(res) {
          resolve({ success: res })
          // var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
          // var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
          // var speed = res.speed; // 速度，以米/每秒计
          // var accuracy = res.accuracy; // 位置精度
        },
        fail: function(res) {
          resolve('fail', res)
        }
      })
    })
  })
}

/**
 * @desc 微信内置地图查看位置接口
 * @param {*} params
 */
function openLocation(params) {
  return new Promise(resolve => {
    wx.ready(() => {
      wx.openLocation({
        latitude: Number(params.latitude), // 纬度，浮点数，范围为90 ~ -90
        longitude: Number(params.longitude), // 经度，浮点数，范围为180 ~ -180。
        name: params.name, // 位置名
        address: params.address, // 地址详情说明
        scale: 14, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: params.infoUrl, // 在查看位置界面底部显示的超链接,可点击跳转
        success: function(res) {
          resolve({ success: res })
        },
        fail: function(res) {
          console.log('openLocation fail', res)
          resolve('fail', res)
        }
      })
    })
  })
}

export default {
  init,
  pay,
  share,
  getLocation,
  openLocation
}
