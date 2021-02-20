### 前言

+ 1px 边框
  动态meta `https://www.cnblogs.com/iifeng/p/11199359.html` 
  - 方案
    ```js
      (function() {
        // 根据dpr动态设置meta viewport
        const docEl = document.documentElement
        const metaEl = document.querySelector('meta[name="viewport"]');
        const dpr = window.devicePixelRatio || 1;
        const scale = 1 / dpr;
        metaEl.setAttribute('content', 'width=' + dpr * docEl.clientWidth + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
      })();
    ```
  - 缺点
    部分drp大于1的安卓机型可能不适配
    不适用安卓, flexible内部做了检测 非iOS机型还是采用传统的scale=1.0, 原因在于安卓手机不一定有devicePixelRatio属性, 就算有也不一定能响应scale小于1的viewport缩放设置, 例如我的手机设置了scale=0.33333333, 显示的结果也与scale=1无异


+ border.scss `https://github.com/imwtr/rem-vw-layout/blob/master/vw/scss/_border.scss`
  - 缺点
    麻烦

scss mixins

sdn

svg

eslint

