// 1. 设计稿为375
// module.exports = {
//   plugins: {
//     autoprefixer: {},
//     'postcss-px-to-viewport': {
//       viewportWidth: 375, // 视窗的宽度，对应的是我们设计稿的宽度，一般是750
//       viewportHeight: 667, // 视窗的高度，根据750设备的宽度来指定，一般指定1334，也可以不配置
//       unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
//       viewportUnit: 'vw', // 指定需要转换成的视窗单位，建议使用vw
//       selectorBlackList: ['.no-vw'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
//       minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
//       mediaQuery: true // 允许在媒体查询中转换`px`
//       // exclude: /(\/|\\)(node_modules)(\/|\\)/  // 打开之后,vant组件px不会转换vw
//     }
//   }
// }

// 2. 设计稿为750
const path = require('path')
module.exports = ({ file }) => {
  // 处理vant vw适配
  const designWidth = file.dirname.includes(path.join('node_modules', 'vant')) ? 375 : 750
  return {
    plugins: {
      autoprefixer: {},
      'postcss-px-to-viewport': {
        unitToConvert: 'px',
        viewportWidth: designWidth,
        unitPrecision: 3,
        propList: ['*'],
        viewportUnit: 'vw',
        fontViewportUnit: 'vw',
        selectorBlackList: ['.no-vw'],
        minPixelValue: 1,
        mediaQuery: true,
        exclude: [],
        landscape: false
      }
    }
  }
}
