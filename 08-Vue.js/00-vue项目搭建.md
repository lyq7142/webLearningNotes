# vue项目搭建

## 1 node环境

node -v
npm -v   |   cnpm -v (使用镜像，可以用cnpm替代npm的地方)

## 2 vue环境

npm i -g vue-cli      //安装脚手架vue-cli2
npm i -g @vue/cli     //安装3.x版本的vue脚手架 vue-cli3
                        vue --version检查是否安装成功

## 3 创建vue项目 （项目名：小写字母 -）

* 方法一：webpack创建
npm i -g @vue/cli-init
npm i webpack -g      //vue2需要安装
------进入项目目录，打开终端------
vue init webpack 项目名       //vue-cli2.x的初始化方式

* 方法二：vue-cli3创建
------进入项目目录，打开终端------
vue create 项目名     //vue-cli3.x的初始化方式

cd 项目目录
npm i
npm run serve

* 方法三：图形化界面
命令行：vue ui ，浏览器8080打开

* 安装其它依赖 (可以在package.json中看到新增加的模块)
npm i less@3.9.0 less-loader@4.1.0 --save -dev
* vue自动打开浏览器
config文件夹---index.js---module.exports---autoOpenBrowser: false-->true
ctrl + c  关闭终端 ，重启即可
* 安装路由router
vue add router
`import VueRouter from 'vue-router'`
`Vue.use(VueRouter)`
* 安装elementUI
npm i element-ui -S
`import ElementUI from 'element-ui';`
`import 'element-ui/lib/theme-chalk/index.css';`
`Vue.use(ElementUI);`
* 安装axios
npm i axios --save
在main.js中引用
`import axios from 'axios'`
`Vue.prototype.$axios = axios`
在组件中使用

```js
<script>
export default {
    mounted(){
        this.$axios.get('/goods.json').then(res=>{
            console.log(res.data);
        })
    }
}
</script>
```

## 4 目录结构

1、build：构建脚本目录
　　　　1）build.js   ==>  生产环境构建脚本；
　　　　2）check-versions.js   ==>  检查npm，node.js版本；
　　　　3）utils.js   ==>  构建相关工具方法；
　　　　4）vue-loader.conf.js   ==>  配置了css加载器以及编译css之后自动添加前缀；
　　　　5）webpack.base.conf.js   ==>  webpack基本配置；
　　　　6）webpack.dev.conf.js   ==>  webpack开发环境配置；
　　　　7）webpack.prod.conf.js   ==>  webpack生产环境配置；
2、config：项目配置
　　　　1）dev.env.js   ==>  开发环境变量；
　　　　2）index.js   ==>  项目配置文件；
　　　　3）prod.env.js   ==>  生产环境变量；
3、node_modules：npm 加载的项目依赖模块
4、src：这里是我们要开发的目录，基本上要做的事情都在这个目录里。里面包含了几个目录及文件：
　　　　1）assets：资源目录，放置一些图片或者公共js、公共css。这里的资源会被webpack构建；
　　　　2）components：组件目录，我们写的组件就放在这个目录里面；
　　　　3）router：前端路由，需要配置的路由路径写在index.js里面；
　　　　4）App.vue：根组件；
　　　　5）main.js：入口js文件；
5、static：静态资源目录，如图片、字体等。不会被webpack构建
6、index.html：首页入口文件，可以添加一些 meta 信息等
7、package.json：npm包配置文件，定义了项目的npm脚本，依赖包等信息
8、README.md：项目的说明文档，markdown 格式
9、.xxxx文件：这些是一些配置文件，包括语法配置，git配置等

* 方法一和方法二区别

1、vue-cli3 移除了配置文件目录：config 和 build 文件夹，增加了vue.config.js文件，移除了static 静态文件夹，新增了 public 文件夹并将 index.html 移动到 public 中。

2、vue-cli2 在 config 中的 dev.env.js 和 prod.env.js 中分别配置域名，vue-cli3 在 vue.config.js中配置域名 vue-cli2 在 config 中的 index.js 中配置跨域，vue-cli3 在 vue.config.js中配置跨域

3、vue-cli3 内部封装了 webpack 且做了很多适合 vue 项目的优化，可以用 vue.config.js 来管理项目，vue-cli2 更加适合有特殊需求的，毕竟是原生的，但管理起来复杂，一般来说，vue-cli3 够用了，但是 vue-cli3 能实现的，vue-cli2 一定能实现，vue-cli2 可以实现的，vue-cli3 不一定能实现。

## 工具

vue cli  ：基于vue.js进行快速开发的完整系统，命令行界面

* 1.安装vue cli脚手架
全局安装老版本：  npm i vue-cli -g   //4以上脚手架才支持vue3
删除旧版本： npm uninstall vue-cli -g
安装新版本： npm i -g @vue/cli
检查是否安装成功： vue --version

* 2.检查vue是否安装成功
vue -V

* 3.新建vue项目

## git管理

用vue-cli创建项目时，自动创建了本地仓库->直接推送远程

git remote add origin 仓库地址
git banch -M main
git push -u origin main   //初次推送，以后直接git push
