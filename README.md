### 前言

##### 1px 边框问题

- 方案 1 根据 dpr 动态设置 meta 的 viewport
  ```js
  ;(function() {
    const metaEl = document.querySelector('meta[name="viewport"]')
    let dpr = window.devicePixelRatio || 1
    dpr = dpr > 3 ? 3 : dpr
    const scale = 1 / dpr
    metaEl.setAttribute(
      'content',
      'width=device-width' + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no'
    )
  })()
  ```
  缺点 部分 drp 大于 1 的安卓机型可能不适配 不适用安卓, flexible 内部做了检测 非 iOS 机型还是采用传统的 scale=1.0, 原因在于安卓手机不一定有
  devicePixelRatio 属性, 就算有也不一定能响应 scale 小于 1 的 viewport 缩放设置, 例如我的手机设置了 scale=0.33333333, 显示的结果也与 scale=1 无异参
  考`https://www.cnblogs.com/iifeng/p/11199359.html`

* border.scss `https://github.com/imwtr/rem-vw-layout/blob/master/vw/scss/_border.scss`
  - 缺点麻烦,代码多,占用伪类

##### vw 适配支持最大最小宽度

vw 适配无法设置最大最小宽度,如有该方面需求,可使用 rem 适配

##### scss mixin

vue.config 配置全局引入

##### sdn

svg

eslint
