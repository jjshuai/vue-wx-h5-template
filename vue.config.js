const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 打包前自动清除dist文件夹
const TerserPlugin = require('terser-webpack-plugin') // 代码压缩 代替 UglifyJsPlugin(UglifyJsPlugin不支持es6)
const CompressionPlugin = require('compression-webpack-plugin') // Gzip
const SpritesmithPlugin = require('webpack-spritesmith') // 雪碧图(一倍图)

const path = require('path')
const resolve = dir => path.join(__dirname, dir)
const IS_PROD = ['production'].includes(process.env.NODE_ENV)
const port = process.env.port || 8086 // 端口

// ------雪碧图样式处理模板开始------
const SpritesmithTemplate = function(data) {
  //  background-size为生成雪碧图的大小
  const icons = {}
  let tpl = `.ico {
  display: inline-block;
  background-image: url(${data.sprites[0].image});
  background-size: ${data.spritesheet.width}px ${data.spritesheet.height}px;
}`

  data.sprites.forEach(sprite => {
    const name = '' + sprite.name.toLocaleLowerCase().replace(/_/g, '-')
    icons[`${name}.png`] = true
    // width/height 设置为图片的原始宽高
    tpl = `${tpl}
.ico-${name}{
  width: ${sprite.width}px;
  height: ${sprite.height}px;
  background-position: ${sprite.offset_x}px ${sprite.offset_y}px;
}
`
  })
  return tpl
}
// -----------雪碧图样式处理模板结束-------------------

module.exports = {
  publicPath: '/', // 署应用包时的基本 URL。 history模式使用
  // publicPath: './', // 署应用包时的基本 URL。hash 模式使用
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: !IS_PROD, // 生产环境的 source map 设置为false
  css: {
    extract: IS_PROD // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中 (而不是动态注入到 JavaScript 中的 inline 代码)。
  },
  lintOnSave: !IS_PROD, // 保存自动lint
  devServer: {
    disableHostCheck: !IS_PROD, // 解决本地ningx代理时报错 Invalid Host header
    port: port,
    open: true, // 启动打开浏览器
    hotOnly: true, // 热更新
    overlay: {
      // eslint检查报错
      warnings: false,
      errors: false
    }
    // proxy: {
    //   // 配置跨域
    //   '/api': {
    //     target: 'https://test.xxx.com', // 接口的域名
    //     // ws: true, // 是否启用websockets
    //     changOrigin: true, // 开启代理，在本地创建一个虚拟服务端
    //     pathRewrite: {
    //       '^/api': '/'
    //     }
    //   }
    // }
  },

  configureWebpack: config => {
    const plugins = [
      new CleanWebpackPlugin() // 自动清除dist文件夹
    ]
    // **生产环境配置**
    if (IS_PROD) {
      plugins.push(
        // gizp压缩
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.(js|css)$/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除源文件
          minRatio: 0.8 // 压缩比
        })
      )

      config.optimization = {
        // 代码压缩
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {},
              compress: {
                drop_console: true,
                drop_debugger: false,
                pure_funcs: ['console.log'] // 删除console.log
              }
            }
          })
        ],
        // 第三方插件拆包
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            // cacheGroups 下可以可以配置多个组，每个组根据test设置条件，符合test条件的模块
            commons: {
              name: 'chunk-commons',
              test: resolve('src/components'),
              minChunks: 3, //  被至少用三次以上打包分离
              priority: 5, // 优先级
              reuseExistingChunk: true // 表示是否使用已有的 chunk，如果为 true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的。
            },
            node_vendors: {
              name: 'chunk-libs',
              chunks: 'initial', // 只打包初始时依赖的第三方
              test: /[\\/]node_modules[\\/]/,
              priority: 10
            },
            vantUI: {
              name: 'chunk-vantUI', // 单独将 vantUI 拆包
              priority: 20, // 数字大权重到，满足多个 cacheGroups 的条件时候分到权重高的
              test: /[\\/]node_modules[\\/]_?vant(.*)/
            }
          }
        }
      }
      // 解决打包警告 入口最大限制  The following asset(s) exceed the recommended size limit (244 KiB).
      config.performance = {
        hints: 'warning',
        maxEntrypointSize: 50000000, // 入口起点的最大体积
        maxAssetSize: 30000000, // 生成文件的最大体积
        assetFilter: function(assetFilename) {
          // 只给出 js 文件的性能提示
          return assetFilename.endsWith('.js')
        }
      }
    }
    // --- 生成雪碧图开始---
    plugins.push(
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, './src/assets/icon/'), // 图标根路径
          glob: '**/*.png' // 匹配任意 png 图标
        },
        target: {
          image: path.resolve(__dirname, './src/assets/image/sprites.png'), // 生成雪碧图目标路径与名称
          // 设置生成CSS背景及其定位的文件或方式
          css: [
            [
              path.resolve(__dirname, './src/assets/style/sprites.scss'),
              {
                format: 'function_based_template'
              }
            ]
          ]
        },
        customTemplates: {
          function_based_template: SpritesmithTemplate
        },
        apiOptions: {
          cssImageRef: '../image/sprites.png' // css文件中引用雪碧图的相对位置路径配置
        },
        spritesmithOptions: {
          padding: 2
        }
      })
    )
    // --- 生成雪碧图结束---

    config.plugins = [...config.plugins, ...plugins]
  },

  chainWebpack: config => {
    // --- svg-sprite-loader 开始---
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icon/svg'))
      .end()
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('./src/assets/icon/svg')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
    // --- svg-sprite-loader 结束---

    // ES6转ES5
    config.entry.app = ['babel-polyfill', './src/main.js']
    // 配置scss全局变量
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 全局scss文件  变量 - 混入
          resources: ['./src/assets/style/variable.scss', './src/assets/style/mixin/index.scss', './src/assets/style/mixin/border.scss']
        })
        .end()
    })
    // **生产环境配置**
    if (IS_PROD) {
      // config.optimization.runtimeChunk('single')
      // 关闭Prefetch 预加载模块
      config.plugins.delete('prefetch')
    }
  }
}
