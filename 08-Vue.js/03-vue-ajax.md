# vue ajax

## axios基本使用

```js
import axios from 'axios'
export default {
  name:'App',
  methods: {
    getStudents(){
      // 假设vue前端应用跑在8080上，要发get请求的地址是5050
      axios.get('http://localhost:5000/students').then(
        response => {
          console.log('请求成功了',response.data)
        },
        error => {
          console.log('请求失败了',error.message)  // 跨域了，失败
        }
      )
    }
}
```

跨域：浏览器从一个域名的网页去请求另一个域名的资源时，域名、端口、协议任一不同
遇到跨域：可以正常发出请求，但浏览器拒绝接收响应
跨域限制：
  1.无法读取非同源网页的cookie/LocalStorage/IndexedDB
  2.无法接触非同源网页的DOM
  3.无法向非同源地址发送Ajax请求（可以发送，浏览器会拒绝接受响应）
解决跨域：
1.jsonp解决：借助script标签里的src属性，只能解决get请求的跨域问题。
2.cors后台解决：写服务器的人在返回响应时，给几个特殊响应头，浏览器解析到特殊响应头时，放行该响应。
3.配置一个代理服务器：nginx  vue-cli   代理服务器的域名、端口与浏览器一致，服务器间通讯没有跨域之忧，只需发送rest请求。

* vue-cli搭建代理一台服务器
vue.config.js中
devServer:{
  proxy: 'http://localhost:5000' // 写后端服务器位置
}
<!-- 配置后直接将要请求的地址指向代理服务器 -->
axios.get('http://localhost:8080/students').then(...)

更强大的方法：
devServer: {
  proxy: {
    '/atguigu': {
      target: 'http://localhost:5000',
      pathRewrite: {'^/atguigu':''}  // 正则表达式，将atguigu变成'' 将来给服务器转发请求时，本来是localhost:5000/atguigu/students变成localhost:5000/students(真实服务器位置)
      ws: true,   // 默认，是否支持webSocket
      changeOrigin: true  // 默认，控制代理服务器是否撒谎（更换自己代理服务器的端口）
    }
  }
}
作用：
<!-- 只有配置了/atguigu的才走代理 -->
axios.get('http://localhost:8080/atguigu/students').then(...)

## vue-resource

## slot插槽

组件标签内部套用其它标签，父子组件通信方式
父组件可以向子组件指定位置插入HTML结构，父向子
分类：默认插槽、具名插槽、作用域插槽

```vue
1.默认插槽
父：
<Category>
  <div>html结构1</div>
</Category>
子：
<template>
  <div>
    <slot>插槽默认内容...</slot>
  </div>
</template>
2.具名插槽
父：
<Category>
  <template slot="center">
    <div>html结构1</div>
  </template>
  <template v-slot:footer>
    <div>html结构2</div>
  </template>
</Category>
子：
<template>
  <div>
    <slot name="center">插槽默认内容...</slot>
    <slot name="footer">插槽默认内容...</slot>
  </div>
</template>
3.作用域插槽 (数据在组件自身，但根据数据生成的结构要组件的使用者决定)
games在子组件中，父组件使用会报错，作用域插槽可以父组件使用子组件的数据
父：
<Category>
  <template scope="scopeData">
    <ul>
      <li v-for="g in scopeData.games" :key="g">{{g}}</li>
    </ul>
  </template>
</Category>
子： 在子插槽上加标签，将数据传给插槽的使用者
<slot :games="games">默认内容</slot>
```
