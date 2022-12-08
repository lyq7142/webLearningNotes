# Express

## 简介

基于node.js平台，快速、开发、极简的web开发框架。
作用类似于node.js内置的http模块，专门用来创建web服务器。
本质是npm上的第三方包。
前端常见服务器：
    web网站服务器：专门对外提供web网页资源
    API接口服务器：专门对外提供API接口

## 基本使用

* 安装
npm i express@4.17.1 安装到项目所在目录中

* 创建基本的web服务器

```javascript
//1.导入express
const express = require('express');

//2.创建web服务器
const app = express();

//3.调用app.listen(端口号，成功的回调函数)，启动服务器
app.listen(80,()=>{
    console.log("express server running at http:127.0.0.1");
})
```

* 监听GET请求   app.get()方法
app.get('请求的url',function(req,res){  处理函数 })
<!-- req 请求对象，包含了与请求相关的属性和方法 -->
<!-- res 响应对象，包含了与响应相关的属性和方法 -->

* 监听POST请求   app.post()方法
app.post('请求的url',function(req,res){  处理函数 })

* 把内容响应给客户端   res.send()方法

```javascript
app.get('/user',(req,res)=>{    //向客户端发送json对象
    res.send({name:'lyq',age:20,gender:'女'})
})
app.post('/user',(req,res)=>{   //向客户端发送文本
    res.send('hello...')
})
```

* 获取url携带的查询参数  req.query对象
req.query默认是空对象，可以访问客户端发送到服务器的参数，如？name=lyq&age=20这种查询字符串形式
如 req.query.name    req.query.age

* 获取url中的动态参数   req.params对象    通过 :参数名 的形式匹配动态参数
req.params默认空对象，存放着通过动态匹配到的参数值
app.get('user/:id',(req,res)=>{ })   //id是动态参数

### 托管静态资源

* express.static()   创建静态资源服务器。要托管多个静态资源目录，多次调用该函数即可
app.use(express.static('public'))  //将public目录下的图片、css、js文件对外开放访问
存放静态文件的目录名不会出现在url中，<http://localhost/images/bg.jpg>  ...

* 挂载路径前缀
app.use('/public',express.static('public'))
可以通过地址<http://localhost:3000/public/> ... 访问public目录中的文件

### nodemon

监听项目文件的变动，当代码被修改后，会自动重启项目，方便开发与调试。
安装：npm install -g nodemon
使用：将node命令替换为nodemon命令，nodemon app.js

## express路由

**客户端的请求** 与 **服务器处理函数** 之间的映射关系。
express路由组成： app.METHOD(PATH,HANDLER)
    请求的类型
    请求的url地址
    处理函数

* 路由的匹配过程：
每当一个请求到达服务器，需要先经过路由的匹配，只有匹配成功之后，才会调用对应的处理函数。
匹配时，按照路由的**先后顺序**进行匹配，如果**请求类型和请求的URL同时**匹配成功，express将这次请求转交给相应的function函数处理。

* 路由的使用：
把路由挂载到app上，如 app.get('/',(req,res)=>{})

**模块化**路由---将路由抽离为单独的模块
1.创建路由模块对应的js文件
2.调用express.Router()函数创建路由对象
3.向路由对象上挂载具体的路由
4.使用module.exports向外共享路由对象
5.使用app.use()函数注册路由模块   //app.user()作用：注册全局中间件

```javascript
//创建路由模块：router.js
var express=require('express')
var router=express.Router()
router.get('/user/list',(req,res)=>{
    res.send('get user list')
})
router.post('/user/add',(req,res)=>{
    res.send('add new user')
})
module.exports = router

// 注册路由模块： app.js
const userRooter = require('./router.js')   //导入路由模块
app.use(userRouter)   //为路由模块添加前缀app.use('./api',userRooter)
```

## express中间件

中间件 Middleware：业务流程的中间处理环节。
调用流程：当一个请求到达express服务器后，可以连续调用多个中间件，对这次请求进行预处理。
    本质就是一个function处理函数。
中间件函数的形参列表必须包含next参数。而路由处理函数只包含req和res。

```javascript
// express中间件格式
var express = require('express')
var app = express()

app.get('/',function(req,res,next){
    next();
})
app.listen(3000);
```

next函数：是实现多个中间件连续调用的关键，把流转关系转交给下一个中间件或路由。

* 定义中间件函数
    <!-- mw指向一个中间件函数。在当前中间件业务处理完毕后，必须调用next()函数 -->
    const mw = function(req,res,next){
        ...
        next();
    }

* 全局生效的中间件：客户端发起的任何请求 到达服务器后，都会触发的中间件。
    app.use(mw)

* 定义全局中间件的简化形式
    app.use(function(req,res,next){
        next();
    })

* 中间件作用：多个中间件之间，共享同一份req和res。可以在上游的中间件中，统一为req或res对象添加自定义的属性或方法，供下游中间件或路由使用。

* 定义多个全局中间件：app.use()连续定义，或按照定义的顺序调用。

* 局部生效的中间件：不使用app.use()定义的中间件。
    const mw1 = function(req,res,next){
        ...
        next();
    }
    <!-- mw1这个中间件只在当前路由中生效（局部生效的中间件） -->
    app.get('/' , mw1 , function(req,res){   //三个参数，mw1是中间件函数
        res.send('首页');
    })
    <!-- mw1不会影响这个路由 -->
    app.get('/user' , function(req,res){
        res.send('用户页');
    })

* 定义多个局部中间件
    app.get('/',mw1,mw2,(req,res)=>{
        res.send('首页');
    })
等价于
    app.get('/',[mw1,mw2],(req,res)=>{
        res.send('首页');
    })

* 中间件注意：要在路由之前注册中间件；可以连续调用多个中间件；
            执行完业务代码记得调用next()函数；next()之后不要写额外代码。

### 中间件分类

1.应用级别的中间件
    绑定到app实例上的中间件，app.get()  app.use()  app.post()
2.路由级别的中间件
    绑定到express.Router()实例上的中间件，router.use()
3.错误级别的中间件：捕获项目中发生的异常错误
    格式：处理函数中，必须有4个形参(err,req,res,next)
4.express内置的中间件
    express.static    快速托管静态资源的内置中间件（无兼容性）
    express.json   解析json格式的请求体数据
    express.urlencoded   解析URL-encoded格式的请求体数据
5.第三方的中间件  body-parser 解析请求体数据
    使用步骤：npm install body-parser
              require()
              app.use()

* 自定义中间件
    eg: 解析post提交到服务器的表单数据。
    实现步骤：
        定义中间件
        监听req的data事件
        监听req的end事件
        使用querystring模块解析请求体数据
        将解析出的数据对象挂载为req.body
        将自定义中间件封装为模块

```javascript
// custom-body-parser.js
const qs=require('querystring')

const bodyParser=(req,res,next)=>{
    let str = ''
    req.on('data',(chunk)=>{
        str+=chunk;
    })
    req.on('end',()=>{
      //  console.log(str);  完整的请求体数据
        const body = qs.parse(str);
        // console.log(body);
        req.body=body;
        next();
    })
}
module.exports=bodyParser;

// test.js
const express = require('express')
const app = express()

const customBodyParser = require('./custom-body-parser')
app.use(custombodyparser)
app.post('/user',(req,res)=>{
    res.send(req.body)
})
app.listen(80,()=>{

})
```

## 写接口

* 编写GET接口
api.Router.get('/get',(req,res)=>{
    const query = req.query;
    res.send({
        status:0,
        msg:'get请求成功',
        data:query
    })
})

* 编写POST接口
api.Router.post('/get',(req,res)=>{
    const body = req.body;
    res.send({
        status:0,
        msg:'post请求成功',
        data:body
    })
})
<!-- 如果要获取URL-encoded格式的请求体数据，必须配置中间件
    app.use(express.urlencoded({extended:false})) -->

解决接口跨域：CORS（主流）、JSONP（只支持GET请求）

### CORS 跨域资源共享

CORS由一系列HTTP响应头组成，这些响应头决定浏览器是否阻止前端js代码跨域获取资源。
浏览器的同源安全策略默认阻止网页跨域获取资源。如果接口服务器配置了CORS相关的HTTP响应头，就能解除浏览器端的跨域访问限制。

CORS响应头：
    **Access-Control-Allow-Origin**   参数的值指定了允许访问该资源的外域URL
res.setHeader('Access-Control-Allow-Origin','http://itcast.cn')
res.setHeader('Access-Control-Allow-Origin','*')   //* 通配符，允许来自任何域的请求
    **Access-Control-Allow-Headers**
默认CORS仅支持客户端向服务器发送9个请求头，如果客户端向服务器发送了额外的请求头信息，需要在服务器端通过Access-Control-Allow-Headers，对额外的请求头进行声明。多个请求头之间,分割。
res.setHeader('Access-Control-Allow-Headers','Content-Type','X-Custom-Header')
    **Access-Control-Allow-Methods**
默认CORS仅支持客户端发起的GET\POST\HEAD请求，如果客户端希望通过PUT\DELETE等方式请求资源，用此方法来指明实际请求所允许使用的HTTP方法。
res.setHeader('Access-Control-Allow-Methods,'POST,GET,DELETE,HEAD')
res.setHeader('Access-Control-Allow-Methods,'*')

* cors请求的分类（根据请求方式和请求头的不同）
    简单请求：GET\POST\HEAD之一；头部信息不超过9种字段
    预检请求：满足任何一个=>请求方式在GET\POST\HEAD之外；请求头包含自定义头部字段；向服务器发送了application\json格式的数据。
浏览器与服务器正式通信前，浏览器先发送OPTION请求进行预检，获知服务器是否允许该实际请求。服务器成功响应预检请求后，才发生真正的请求，并携带真实数据。
简单请求：客户端与服务器之间只发生一次请求；预检请求：两次。

* JSONP接口
浏览器通过script标签的src属性，请求服务器上的数据，同时服务器返回一个函数调用。
不属于真正的Ajax请求，仅支持GET请求
