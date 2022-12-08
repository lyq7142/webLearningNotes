# vue-router

## 基础使用

路由就是一组key-value的对应关系，key为路径，value为function或component。

* 单页面SPA应用：不管怎么点击，浏览器不发生全部刷新/跳转到其它页面，但浏览器地址栏发生变化。整个应用只有一个完整界面；点击页面导航不会刷新页面，数据交换通过ajax前期完成。
vue2 --- vue-router@3
vue3 --- vue-router@4

main.js中引入：import VueRouter from 'vue-router'
Vue.use(VueRouter)
new Vue({
  ...
  router
})

* router-link
`<router-link to="/xxx">`
* router-view
`<router-view></router-view>`
* active-class
配置了该属性后，谁被选中，里面的值就会被加在哪个class身上，class="list-group-item active"
`<router-link class="list-group-item" active-class="active" to="/about">about</router-link>`
* replace
控制路由跳转时操作浏览器历史记录的模式
浏览器历史记录写入方式：push追加（默认）/replace替换
`<router-link replace ...>News</router-link>`

需要用 router-view 来加载的组件 ---> 路由组件，一般在pages文件夹内，像是一个个页面About.vue / Home.view / News.view
需要显示使用标签来的             ---> 一般组件

每个组件有自己的$route属性，里面存储自己的路由信息
每个组件上有全局的$router，这是全局唯一共享的

## 嵌套(多级)路由children

一级路由需要加 / ，二级路由不加 /

```js
// 配置路由规则
routes:[
  {
    path:'/about',
    component:About
  },
  {
    path:'/home',
    component:Home,
    children: [
      {
        path:'news',
        component:News
      },
      ...
    ]
  }
]
跳转
<router-link to="/home/news"></router-link>
```

## 路由传参-query参数

接收参数存放在this.$route.query中

```vue
父：
字符串写法：
<router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`"></router-link>
对象写法：
<router-link :to="{
  path:'/home/message/detail',
  query: {
    id:m.id,
    title:m.title
  }
}">
  {{m.title}}
</router-link>

子：
{{$router.query.id}}
{{$router.query.title}}
```

## 路由传参-params参数

在路径中直接传参
比如 /student?id=1 ，也可以这么传：/student/id/1 这叫params参数。
此时要使用to的对象写法

## 命名路由-name属性

简化写一长串路由：/home/new/message/1 直接通过写name简化

## props配置

让路由组件更方便的收到参数

## 编程式路由导航 $router

this.$router.push(...)
this.$router.replace(...)
this.$router.back()
this.$router.forward()
this.$router.go(3)

## 缓存路由组件 keep-alive标签

一旦切换组件，之前的组件就被销毁了，再次切换回来就重新创建一个新组件
让组件在切换时保持挂载不销毁，指定组件名，就是选择不销毁哪个指定的组件
`<keep-alive include="News">`
缓存多个路由组件 `<keep-alive :include="['News','Message']">`

## 两个新生命钩子（仅路由）

activated() / deactivated()  当路由被激活/失活时，控制该组件

## 路由守卫

作用：控制路由权限

* 全局路由守卫
在路由器入口index.js处配置，所有路由在此注册，都会调用到路由守卫函数。
全局前置：router.beforeEach() 初始化时被调用，拦截，只要不调用next()就不放行
全局后置：router.afterEach() 初始化和每次路由切换后被调用

* 独享路由守卫 beforeEnter
将全局前置路由守卫的代码挪到路由注册的地方

* 组件内路由守卫
配置在VueComponent里面的路由守卫
beforeRouteEnter()
beforeRouteLeave()
next()决定是否放行

## 路由器两种工作模式 history hash

* hash模式（默认）
路由器的/#/及之后的路径---路径的hash值
特点：不会随着服务器的请求发给服务器，只有#之前的会发给server
* history模式
<!-- 改成history模式 mode:'history'-->
会随着服务器的请求发送给服务器，没有#，兼容性略差
eg：localhost:5000/home/message/detail?id=...中的
/home/message/detail?id=...会被当作一次服务器请求，请求服务器资源，但这只是纯前端路由，服务器也没有该资源，会报错404
解决：要么改成hash模式，要么后端解决，后端匹配哪些请求是纯前端的，然后对这些请求不予响应即可。
nodejs库 connect-history-api-fallback
nginx 配置可以自动分辨前后端路由
Java后端类库

## 前端项目上线流程

将所写的全部项目打包，生成html,css,js文件---才能被浏览器解析。
执行 npm run build
打包后生成一个dist文件夹，里面是生成的html,css,js文件。
dist目录要启动http服务器访问，本地预览生产环境构建最简单的方式：使用node.js静态文件服务器，如serve
npm i serve -g
serve -s dist   // -s：将其架设在SPA模式下，可以处理路由问题
打包后的东西必须去服务器上部署：
  合并部署：静态资源和服务器打在同一个包内
  分开部署：dist和服务器代码分开打包部署

* nodejs+express简易服务器部署：
mkdir vue_deploy
cd vue_deploy
npm init
touch server_test.js

```js
// server_test.js内部代码
const express = require('express')
const app = express()

app.use(express.static(__dirname + '/static'))  //指定的静态资源目录static

app.get('/person', (request, response)=>{
  const resp = {
    id: 123,
    users: "users"
  }
  response.send(JSON.stringify(resp))
})

app.listen(5000, (err)=>{
  if(!err) 
    console.log('服务器启动成功了,请求地址为：http://localhost:5000/person');
})
```

根目录新建static
把dist内部文件拷贝到static
npm i express
node server_test.js
访问<http://localhost:5000>即可
