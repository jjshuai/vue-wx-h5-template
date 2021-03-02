##### 格式化

- `setting.json`

```json
// 安装 eslint prettier vetur 插件 .vue 文件使用 vetur 进行格式化，其他使用prettier

{
  "window.zoomLevel": 0,
  "editor.fontSize": 16, // 字体大小
  "editor.fontLigatures": false, // 启用字体连字
  "workbench.colorTheme": "Monokai", // 主题
  "javascript.updateImportsOnFileMove.enabled": "always", // import路径移动或者重命名时，自动更新
  "explorer.confirmDragAndDrop": false, //拖动文件夹到资源管理器中的时候有提示确认框
  "editor.detectIndentation": false, // vscode默认启用了根据文件类型自动设置tabsize的选项
  "editor.tabSize": 2, // 重设

  "git.enableSmartCommit": true,
  "git.confirmSync": false,
  "gitlens.advanced.blame.customArguments": [],

  // 显示文件夹过滤
  "files.exclude": {
    "**/miniprogram_npm": true,
    "**/node_modules": true,
    "package-lock.json": true
  },
  // 搜索文件夹过滤
  "search.exclude": {
    "**/node_modules": true,
    "**/bower_components": true
  },

  "singleQuote": true, //单引号
  "semi": false, //是否需要分号
  // "editor.renameOnType": true,
  "files.autoSave": "off", // 自动保存
  // 开启eslint自动修复js/ts功能
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": false
  },

  // 保存时eslint自动修复错误
  "editor.formatOnSave": true,

  // 为指定的语法定义配置文件或使用带有特定规则的配置文件。
  "emmet.syntaxProfiles": {
    "vue-html": "html",
    "vue": "html"
  },

  // Enable per-language 禁用默认格式化
  "json.format.enable": false,
  "javascript.format.enable": false,
  "typescript.format.enable": false,
  "javascript.format.insertSpaceAfterFunctionKeywordForAnonymousFunctions": false,
  "html.format.enable": false,

  // 各种文件的格式化规则
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode" // 规则在.prettierrc文件
  },
  "[vue]": {
    "editor.defaultFormatter": "octref.vetur"
    // "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
    // "editor.defaultFormatter": "HookyQR.beautify"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },

  // 添加 vue 支持
  // 这里是针对vue文件的格式化设置，vue的规则在这里生效
  // "vetur.format.defaultFormatter.html": "js-beautify-html",
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.postcss": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.sass": "sass-formatter",
  "vetur.format.defaultFormatter.ts": "prettier",
  "vetur.format.defaultFormatterOptions": {
    "js-beautify-html": {
      "wrap_attributes": "aligned-multiple" //自动换行并对齐
      // "wrap_attributes": "aligned-multiple", // 超过150换行
      // "wrap-line-length": 150
    },
    // vue文件中 js格式化配置
    "prettier": {
      "wrap_attributes": "aligned-multiple", // 自动换行
      "trailingComma": "none", // 多行时最后的逗号
      "semi": false, // 句尾是否加;
      "singleQuote": true // 使用单引号而不是双引号
    }
  },

  "vetur.ignoreProjectWarning": true, // 忽略vetur警告
  "vetur.validation.template": false,

  // 保存生成wxss文件(小程序用,安装Easy LESS插件 )
  "less.compile": {
    "outExt": ".wxss"
  },

  "files.associations": {
    "*.wxss": "css",
    "*.cjson": "jsonc",
    "*.wxs": "javascript"
  },
  "emmet.includeLanguages": {
    "wxml": "html"
  },
  "minapp-vscode.disableAutoConfig": true,
  "settingsSync.ignoredSettings": []
}
```

##### cdn

svg
