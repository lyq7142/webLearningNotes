# webpack4

## webpack和gulp

* Webpack
前端模块化方案，侧重**模块打包**，静态模块打包器（module bundler），将前端所有资源（css/img/less/js/json）看成模块，通过加载器(loader)和插件(plugins)对资源处理，打包成符合生产环境部署的前端资源（bundle）。
模块化：根据模块的依赖关系静态分析，找到js模块以及浏览器不能直接运行的语言（typescript），将其转换和打包成合适的格式供浏览器使用。

* Gulp
自动化构建工具，强调**前端开发流程**，配置task，定义task处理事物，定义执行顺序，让gulp执行task，（=> 打包项目）。
任务化：所有功能都有统一的接口管理，必须注册一个任务，去执行。

二者都可对文件进行合并与压缩。

## webpack打包流程

1.初始化：启动构建，合并shell和配置文件参数，加载插件plugin，实例化compiler对象，处理入口。
2.编译：从entry发出，针对每个module串行调用对应loader翻译文件内容，找到依赖module，递归的编译处理。
3.输出：对编译后的module组合成chunk，转换成文件，输出到文件系统。

* webpack阶段
1.webpack准备阶段
2.modules和chunks的生成阶段
3.文件生成阶段

## webpack五个核心概念

1.Entry
    入口，指示webpack以哪个文件作为入口起点开始打包，分析构建内部依赖图。
2.Output
    输出，指示webpack打包后的资源bundles输出到哪，如何命名。
3.Loader
    让webpack能够处理非js的文件（webpack自身只理解js）。
4.Plugins
    插件，执行更广的任务，包括打包优化、压缩、重定义环境变量等。
5.Mode
    模式，指示webpack使用相应模式的配置。
        development：开发模式，能让代码本地调试运行的环境。
        production：生产模式，能让代码优化上线运行的环境。

* 运行指令：
1.开发环境：webpack ./src/index.js -o ./build --mode=development
    webpack会以 ./src/index.js为入口文件开始打包，打包后输出到./build/built.js，整体打包环境是开发环境。
2.生产环境：webpack ./src/index.js -o ./build --mode=production

index.js是入口文件，src是源代码目录，build是打包后输出的目录。

webpack本身只能处理js模块，如果要处理其它类型文件，要loader转换；
生产环境和开发环境 都能将ES6模块化编译成浏览器能识别的模块化；
生产环境：多一个压缩js的代码。

## webpack体验

入门教程 <https://www.runoob.com/w3cnote/webpack-tutorial.html>

webpack.config.js ：webpack配置文件，指示webpack干哪些活（运行webpack指令时，会加载里面的配置）
所有构建工具都是基于node.js平台运行，模块化默认采用commonjs语法。
打包命令: webpack 原文件 目标文件

* 打包样式css资源
<!-- loader: 下载  配置 -->
npm i css-loader style-loader
// css-loader会遍历css文件，找到url()表达式进行处理
// style-loader会把原本css代码插入页面style标签中

* 打包html资源
<!-- plugins：下载 引入 配置 -->
plugins: [
    new HtmlWbpackPlugin()
]

* 打包图片img资源
<!-- loader: 下载  配置 -->

* 打包其它资源（字体图标）
import './iconfont.css';   //index.js中

 rules: [{  <!-- 排除这些资源就可以打包其它资源 -->
    exclude: /\.(css|js|html|less)$/ ,
    loader: 'file-loader'
    options:{
        name: '[hash:10].[ext],
        outputPath: 'media'
    }
}]

* 开发服务器 devServer
可以通过localhost:8080启动一个express静态资源web服务器，以监听模式自动运行webpack，浏览器可以浏览页面和编译后的资源输出，通过socket.io服务实时监听变化并自动刷新页面。

自动打包（自动编译、打开、刷新浏览器）
只会在内存中编译打包，不会有任何输出
运行指令：webpack-dev-server

* 提取css成为单独文件
npm i mini-css-extract-plugin -D

use: [
    miniCssExtractPlugin.loader,   //取代style-loader
    'css-loader'
]
plugins:[
 new miniCssExtractPlugin()
]

* css兼容性处理：postcss-loader  postcss-preset-env   (报错)
<!-- 用postcss找到package.json中browserlist里的配置，加载指定的css兼容性样式 -->
{
    loader:'postcss-loader',
    options:{
        ident:'postcss-loader',
        plugins:()=>[
            require('postcss-preset-env')()
        ]

    }
}
在package.json中写：
 "browserslist": {
    "development":[  //开发环境，要设置node环境变量：process.env.NODE_ENV =development
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ],
    "production" : [  //默认看生产环境
      ">0.2%",
      "not dead",
      "not op_mini all"
    ]
  }

* 压缩css

* js语法检查eslint    eslint-loader
只检查自己写的源代码，不用检查三方库
设置检查规则：package.json中eslintConfig设置
            airbnb --> eslint-config-airbnb-base  eslint-plugin-import   eslint
rules:[
    test: /\.js$\,
    exclude: /node_modules/,
    loader:'eslint-loader',
    options:{

    }
]
package.json中：
"eslintConfig":{
    "extends": "airbnb-base"
}
