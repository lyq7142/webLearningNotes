# HTTP协议概念及工作流程

webservice = http+XML
REST = http+json
各种API = http+XML/json实现
采集、小偷站、Ajax

协议：与现实中协议一样，一式多份，双方或多方都遵从共同的规范，达成共识。eg:ftp http pop tcp/ip

HTTP协议：按一定规则，向服务器索要数据，或发送数据，而服务器按一定规则，回应数据。

## 工作流程

打开一个页面时，发生了什么？
客户端 -------- web服务器（apache/Nginx/iis）

原始状态：客户端与服务器之间没有关系

客户端   --建立连接，发送请求-->     服务器
       <--沿着连接，返回响应信息--

客户端收到响应html代码，解释出图片、文字

客户端    --断开连接--     服务器

* HTTP请求信息和响应信息的格式

GET /0606/01.php HTTP/1.1
Host: localhost

HTTP/1.1 200 OK
Date: 。。。
Server:Apache/2.2.21 (Win32) PHP/5.3.8
X-Powerde-By:PHP/5.3.8
Content-Length: 5
Content-Type: text/html

hello

chrome开发者模式->network可以查看页面加载过程中所有的请求，点开其中一个，Headers和Response比较重要，点击viewsource可以查看原始头报文。响应体（返回的代码）在Response中。

**请求报文：**

1.请求行：请求方法 请求路径 所用协议
POST /0606/01.php HTTP/1.1

2.请求头信息
Host: Localhost

3.空行

4.请求主体信息（GET没有，POST可以不为空）

**响应报文：**

1.响应行：协议版本 状态码 状态文字
HTTP/1.1 200 OK

2.响应头信息（格式为key: value）

3.空行

4.响应主体（可能没有）
html代码在这

```http
POST /0606/01.php HTTP/1.1
Host: localhost
Content-Type: application/x-www-form-urlencoded
content-Length: 24     (要标明主体的长度和类型，POST比GET多了主体信息)

username=zhangsan&age=28HTTP/1.1 200 OK
Date:  
Server:Apache/2.2.21 (Win32) PHP/5.3.8
X-Powerde-By:PHP/5.3.8
Content-Length: 10       （接下来主体的长度）
Content-Type: text/html

zhangsan                
        28
```

（主体信息是username=zhansan&age=28）

## HTTP请求方式

* 请求方法：**GET POST** HEADER PUT TRACE DELETE OPTIONS CONNECT
HEAD 和 GET基本一致，只是不返回响应体
HEAD用于判断一个内容是否存在，不用返回具体内容
TRACE：回显服务器收到的请求，主要用于测试或诊断
OPTIONS：返回服务器可用的请求方法
PUT: 向指定资源位置上传最新内容

### get 和 post 区别

get用来获取数据，post提交数据
get不安全，传输时数据放在可见的url中；post数据在http的请求体中，用户不可见，相对安全
get传输数据量小受url长度限制；post数据量大不受限制
get是明文传输，post是放在请求体中，但是开发者可以通过抓包工具看到，也相当于是明文的
get请求会保存在浏览器历史记录中，还可能保存在web服务器的日志中
get限制form表单数据集必须ASCII字符，get执行效率高，是form提交的默认方法
// 私密性的信息请求使用post；查询信息使用get

## 状态码status

状态码：反映服务器响应情况
状态文字：描述状态码，便于人观察

1XX   指示信息
2XX   成功
3XX   重定向
4XX   客户端错误
5XX   服务器错误

常见：
200 OK  服务器成功返回网页
301/302 永久/临时重定向
304 NOT MODIFIED 未修改（再次刷新网页，服务器从缓存里取资源，减轻服务器传输的压力，是客户端告诉服务器自己有该资源）

失败：
404 NOT FOUND 请求的网页不存在
500 服务器内部错误
503 服务器暂时不可用

应用场景：
301：域名需要切换、协议从http变成https；
302：未登录时访问已登录页时跳转到登录页面、404后跳转首页

## http和https的区别

http：明文发送信息
https：http的安全版，安全基础是SSL，SSL为数据通讯提供安全支持，分为两层：记录协议、握手协议。
SSL记录协议：建立在TCP之上，为高层协议提供数据封装、压缩、加密功能的支持。
SSL握手协议：建立在记录协议之上，在实际数据传输前，双方身份认证，协商加密、交换加密算法。

* 区别：
http是超文本传输协议，明文传输，https具有安全性的ssl加密传输协议。
https协议ca申请证书，要钱。
连接方式不同，端口不同，http是80端口，https是443端口。
http连接简单，是无状态的，https是ssl+http构建的可进行加密传输、身份认证的网络协议。

### https如何保证安全

https=http+ssl/tls
ssl协议：安全套接层，已废弃
tls协议：传输层安全性协议，对称加密算法，消息验证码MAC，身份认证

https作用：内容加密、身份认证、数据完整性。

## http1.x 和 http2.x 区别

1.http2使用二进制传输，http1是文本（字符串）传送
2.http2支持多路复用
3.http2头部压缩
4.http2支持服务器主动推送
