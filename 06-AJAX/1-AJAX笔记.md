# AJAX

## AJAX简介

AJAX：异步的JS和XML
通过AJAX，在浏览器中向服务器发送异步请求。**无刷新获取数据**。

优点：
    无需刷新页面与服务器端通信；
    根据部分用户事件更新部分网页内容；
    创建快速动态网页，实现异步局部更新。
缺点：
    没有浏览历史，不能回退；
    跨域问题（同源）；默认不允许不同网站之间发送请求
    SEO不友好。爬虫爬不到商品数据

* 应用：
（注册时，输入用户名自动检测用户名是否已存在）
（登录时，提示用户名密码错误）
（搜索框输入关键字时，js把字符发送到服务器，服务器返回一个相关提醒的列表）
（鼠标悬浮板块，出现新内容板块->懒加载，提高页面加载速度）
（页面滚动到底部，动态创建新板块做填充->淘宝，朋友圈）

* 发送AJAX的四种方式：原生、jQuery、fetch、axios

chrome开发者模式network可以查看页面加载过程中所有的请求，点开其中一个，Headers和Response比较重要，点击viewsource可以查看原始头报文。响应体（返回的代码）在Response中。

## XML简介

XML：可扩展标记语言，用来传输和存储数据。XML中没有预定义标签，全是自定义标签。

现在被JSON取代。

学生数据  name="孙悟空";age=18;gender="男";
用XML表示：

```XML
<student>
    <name>孙悟空</name>
    <age>18</age>
    <gender>男</gender>
</student>
```

用JSON表示：
{"name":"孙悟空","age":18,"gender":"男"}

## 创建XMLHttpRequest对象

XMLHttpRequest（XHR）：在后台与服务器交换数据
`const xhr = new XMLHttpRequest();`

## 向服务器发送请求

open(method,url,async)
    method：请求的类型，GET POST
    async：true同步  false异步（不推荐）

send(string)
    string：仅用于POST请求

`xhr.open("GET","ajax_info.txt");`
`xhr.send();`

## 服务器响应

responseText：获得 字符串 形式的响应数据
responseXML：获得 XML 形式的响应数据

## onreadystatechange 事件

onreadystatechange：存储函数，每当 readyState 属性改变时，就会调用该函数
readyState：存有 XMLHttpRequest 的状态，从 0 到 4 发生变化
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪

status：  200: "OK"
          404: 未找到页面
