# vue-wx-h5-template

基于 vue2.0 + vue-cli4.0 + webpack 4 + vw 适配方案 + vant ui + sass + axios 封装，构建手机端微信公众号模板脚手架

### 启动项目

```bash

cd vue-wx-h5-template

yarn install

yarn dev
```

<span id="top">目录</span>

- [√ 配置多环境变量](#env)
- [√ 全局过滤处理(token、授权等)](#gloabel)
- [√ vw 适配方案(兼容 vant)](#vw)
- [√ 1px 边框问题](#1px)

- [√ ios 落地页问题](#ios)
- [√ VantUI 组件按需加载](#vant)
- [√ Sass 全局样式](#sass)
- [√ Vuex 状态管理](#vuex)
- [√ Vue-router](#router)
- [√ Axios 封装及接口管理](#axios)
- [√ Webpack 4 vue.config.js 基础配置](#base)
- [√ Eslint+Pettier 统一开发规范 ](#pettier)

### <span id="env">✅ 配置多环境变量 </span>

- 在根目录下新建并配置 `.env` `.env.development` `.env.staging` `.env.production` 等文件

&emsp;&emsp;其中`.env` 为全局默认配置文件，不论什么环境都会加载合并

&emsp;&emsp;其中`.development` 为开发环境下的配置文件

&emsp;&emsp;其中`.staging` 为测试环境下的配置文件

&emsp;&emsp;其中`.production` 为生产环境下的配置文件

&emsp;&emsp;可根据需求配置不同环境下变量 ,注意：属性名必须以 `VUE_APP_`开头 ,如 `VUE_APP_APPID`、`VUE_APP_BASE_API` 等

&emsp;&emsp;当然也可以单独新建文件如`src/config/env.**.js`用来单独处理环境,看个人喜好吧,上面那样做好处就是可以简单直接粗暴的修改,坏处就是修改后需要重
启项目。单独新建文件处理修改参数后不需要重启项目

&emsp;&emsp;上面配置可在代码中可以通过 `process.env.VUE_APP_` 访问,如`process.env.VUE_APP_APPID`。

- `package.json` 里的 `scripts` 配置 `dev` `build:stage` `build:prod`，通过 `--mode xxx` 来执行不同环境

```javascript
"scripts": {
  "dev": "vue-cli-service serve",
  "build:stage": "vue-cli-service build --mode staging",
  "build:prod": "vue-cli-service build --no-clean  --mode production --report",
}
```

[▲ 回顶部](#top)

### <span id="gloabel">✅ 全局过滤处理(token、授权等) </span>

全局的一些过滤处理比如说获取用户信息、页面权限判断、微信的授权以及 apiList 注入等都是放在`src/filter`文件夹中

&emsp;&emsp;**微信 js-api-sdk 的使用是需要每个页面都得先注入配置信息**

每个逻辑或者一些相似逻辑为一个文件,这样做的好处是逻辑简单明了,方便阅读,比较容易后期维护修改,每个文件都不需要做太多的判断(虽然会显得文件多一些)。这个根
据业务需求自行增加即可

有两点要注意一下

- `src/filter/index.js`中引入的 `js` 调用顺序问题

  &emsp;&emsp;比如微信授权 `thirdAuth.js` 和微信授权回调`thirdAuthCB.js`,应该是`thirdAuth.js`在前先判断是否需要微信授权以及拉起微信授权,然后再
  由`thirdAuthCB.js`生成对应的`token`等信息

- 在`main.js` 引用 `src/filter/index.js`并调用`filter.doFilters()`时机问题

  &emsp;&emsp;如在 `src/filter` 引用了其他文件,则应该在该文件夹初始化之后调用`filter.doFilters()`

[▲ 回顶部](#top)

### <span id="vw">✅ vw 适配方案(兼容 vant) </span>

本项目采用的移动端适配方式为 vw 适配,优点就不说了,缺点就是不能做最大值最小值限制。与 rem 适配的对比可参
考[某大佬文章](https://www.cnblogs.com/imwtr/p/9648233.html#top)

首先安装 px 转 vw 插件 `postcss-px-to-viewport`

配置转换规则

```JavaScript
// postcss.config.js
const path = require('path')
module.exports = ({ file }) => {
  // 处理vant vw适配
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750
  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: designWidth, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
        unitPrecision: 3,  // 指定`px`转换为视窗单位值的小数位数
        propList: ['*'],
        viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
        fontViewportUnit: 'vw',
        selectorBlackList: ['.no-vw'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],   // 哪些文件不被转换
        landscape: false,
      }
    }
  }
}
```

&emsp;&emsp;vant 的设计图为 375,正常情况下,我们的设计图为 750,所以设置了动态 `designWidth` 来适配 vant

[▲ 回顶部](#top)

### <span id="1px">✅ 1px 边框问题 </span>

关于 1px 边框问题原因什么的就不赘述了,网上一查一大把

解决办法其实也一大把: `background-image` `border-image`等,综合对比下来这里提供两种解决方法

&emsp;&emsp;一种为大名鼎鼎的`flexible`解决方案,即根据设备 drp 动态设置 viewport,缺点为要设置好没转为 vw 的 px 的值

&emsp;&emsp;&emsp;&emsp;比如: `public/index.html `中有 dom 元素,且设置了`font-size`等 px 相关单位,那么当 dpr 不为 1 时,呈现的 px 大小 比 实际 书写 px
要小,要做好适配处理,比如媒体查询 `@media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2)`

&emsp;&emsp;&emsp;&emsp;当然,如果项目中 px(大于 1px) 都转换为了 vw,可采用此方式来处理 1px 问题,直接书写即可`border: 1px solid #000;`

```js
// public/index.html
;(function () {
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

&emsp;&emsp;l 另一种为使用 transform 结合媒体查询进行动态缩放,好处就是**兼容性强,基本可适用任何情况**,缺点就是比较**麻烦**,参
考[某大佬文章](https://www.cnblogs.com/imwtr/p/9648233.html#top),此项目已经完成 scss 版本的 1px 边框生成器 `src/assets/style/mixin/border.scss`,
`@include border($direction: (top, right, bottom, left), $size: 1px,$color: #ccc,$style: solid,$radius: 40px);` 直接使用即可 。大树底下好乘凉,再次感
谢[这位大佬](https://www.cnblogs.com/imwtr/p/9648233.html#top)

以上两种方法,可根据自身项目情况食用

[▲ 回顶部](#top)
