
import common from './common'
import thirdAuth from './thirdAuth'
import thirdAuthCB from './thirdAuthCB'
import weixin from './weixin'
import permission from './permission'

function doFilters() {
  common.doFilter() // 全局处理 遮罩层 标题。。。
  thirdAuth.doFilter() // 登录/个人信息及第三方授权 userInfo判断
  thirdAuthCB.doFilter() // 第三方授权 用code获取token等
  weixin.doFilter() // 微信 js-sdk初始化
  permission.doFilter() // 页面权限
}

export default {
  doFilters
}
