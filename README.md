### 前言

##### 1px边框问题
   
- 方案1
  根据dpr动态设置meta的viewport
    ```js
      (function() {
        const metaEl = document.querySelector('meta[name="viewport"]');
        let dpr = window.devicePixelRatio || 1;
        dpr = dpr > 3 ? 3 : dpr;
        const scale = 1 / dpr;
        metaEl.setAttribute('content', 'width=device-width' + ',initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
      })();
    ```
  缺点
    部分drp大于1的安卓机型可能不适配
    不适用安卓, flexible内部做了检测 非iOS机型还是采用传统的scale=1.0, 原因在于安卓手机不一定有devicePixelRatio属性, 就算有也不一定能响应scale小于1的viewport缩放设置, 例如我的手机设置了scale=0.33333333, 显示的结果也与scale=1无异
  参考`https://www.cnblogs.com/iifeng/p/11199359.html` 


+ border.scss `https://github.com/imwtr/rem-vw-layout/blob/master/vw/scss/_border.scss`
  - 缺点
    麻烦,代码多,占用伪类

##### vw适配支持最大最小宽度
  vw适配无法设置最大最小宽度,如有该方面需求,可使用rem适配


##### scss mixin

vue.config配置全局引入

##### sdn





svg

eslint

