# BOM（Browser Object Model）浏览器对象模型

将浏览器的各个组成部分封装成对象。

* 常用BOM属性：
    window 窗口对象
        document 文档对象
        history 历史对象
        screen 屏幕对象
        navigator 浏览器对象
        location 地址对象

## 1、window

​window.方法名();    // window引用可以省略

1.获取浏览器窗口尺寸
    window.innerWidth    获取可视窗口宽度
    window.innerHeight   获取可视窗口高度
2.浏览器的弹出层
    提示框  window.alert('提示信息'); 显示带有一段消息和确认按钮的警告框。
    询问框  window.confirm();  显示一段消息和确认、取消按钮的对话框，用户点确定返回true，取消返回false。
    输入框  window.prompt(); 显示可提示用户输入的对话框，返回用户输入的值或null。
3.打开和关闭标签页
    window.open('page.html');  打开新窗口或查找已命名窗口，返回新的window对象。
    window.close();          关闭浏览器窗口，谁调用就关谁。
4.浏览器常见事件
    资源加载完毕         window.onload=function(){}
    可视(窗口)尺寸改变   window.onresize=function(){}
    滚动条位置改变       window.onscroll=function(){}
5.浏览器卷去的尺寸（兼容写法）
    卷去的高度   document.documentElement.scrollTop ||  document.body.scrollTop
    卷去的宽度   document.documentElement.scrollLeft || document.body.scrollLeft
6.浏览器滚动到
    window.scrollTo(left,top)    // 浏览器卷去的 宽度，高度 （瞬间定位）
    window.scrollTo({           // 浏览器卷去的 宽度，高度，定位方式
        left: xx,
        top: yy,
        behavior: 'smooth'  //smooth 平滑滚动
    })
7.定时器

* 间隔定时器：按照指定周期（毫秒）去执行指定的代码。
    setInterval(函数，时间)          //函数：每次要执行的内容，时间：单位毫秒
* 延时定时器：在固定的时间（毫秒）后执行一次代码。
    setTimeout(函数，时间)

* 关闭定时器：不区分定时器种类，都可以关
    clearInterval(要关闭的定时器的返回值)
    clearTimeout(要关闭的定时器的返回值)
// 返回值：只表示是页面上的第几个定时器。--> 关闭定时器

```javascript
//一次性定时器（延时）
var res = setTimeout(fn,3000);
function fn(){
    alert('boom!!!');
}
clearTimeout(res);   //取消定时器

//循环定时器(间隔)
setInterval(function(){
    console.log('123');
},2000)
    // 或
function fun1(){
    alert('boom!!!');
}
var res1 = setInterval(fun1,2000);
clearInterval(res1);   //取消定时器
```

* window属性：
​    获取其它BOM对象：history、location、navigator、screen
​    获取DOM对象：document

```javaScript
var h1 = window.history;
var h2 = history;   // window可以省略
window.document.getElementById("");
document.getElementById("");
```

## 2、Location

* 解析url:
location.href-- 返回或设置当前文档的URL
location.search -- 返回URL中的查询字符串部分。例如 <http://www.dreamdu.com/dreamdu.php?id=5&name=dreamdu> 返回包括(?)后面的内容?id=5&name=dreamdu
location.hash -- 返回URL#后面的内容，如果没有#，返回空
location.host -- 返回URL中的域名部分，例如www.dreamdu.com
location.hostname -- 返回URL中的主域名部分，例如dreamdu.com
location.pathname -- 返回URL的域名后的部分。例如 <http://www.dreamdu.com/xhtml/> 返回/xhtml/
location.port -- 返回URL中的端口部分。例如 <http://www.dreamdu.com:8080/xhtml/> 返回8080
location.protocol -- 返回URL中的协议部分。例如 <http://www.dreamdu.com:8080/xhtml/> 返回(//)前面的内容http:
location.assign -- 设置当前文档的URL
location.replace() -- 设置当前文档的URL，并且在history对象的地址列表中移除这个URL location.replace(url);
location.reload() -- 重载当前页面（刷新页面）

## 3、history

​history.back()   后退一页，加载历史列表中的前一个URL
​history.forward()   前进一页
​history.go()     前进或后退指定页面数，... -1，0，1 ...
history.length    返回当前窗口历史列表中的URL数量--当前窗口记录数

## 4、screen

screen.width  屏幕宽度
screen.height  屏幕高度

## 5、navigetor

* 检测浏览器的类型（ua问题）

```js
// 检测是否为Chrome浏览器
var ua = navigator.userAgent;
console.log(ua);
var isChrome =ua.indexOf('Chrome');
console.log(isChrome); // true为是
```
