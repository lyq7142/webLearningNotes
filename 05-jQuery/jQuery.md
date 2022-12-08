# jQuery

轻量级的JavaScript函数库
功能：HTML元素选取，操作，时间函数、CSS操作、js特效动画、DOM遍历修改、AJAX、Utilities

## 引用

下载文件引用：`<script src="jquery-1.10.2.min.js"></script>`
内容分发网络CDN引用：（加载快）
`<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>`
`<script src="https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>`

## 语法

`$(selector).action()`

`$：定义jQuery`
(selector)：查询查找HTML元素
action()：对元素进行操作

## 文档就绪事件

防止文档在完全加载（就绪）之前运行 jQuery 代码

```javascript
// jQuery入口函数
$(document).ready(function(){
   // jQuery 代码...
});
或
$(function(){
   // jQuery 代码...
});
```

## 选择器

元素选择器：`$("p")`
\#id选择器：`$("#test")`
.class选择器：`$(".test")`

例：
`$("*")`   选取所有元素
`$(this)`   选取当前HTML元素
`$("ul li:first")`   选取第一个 ul 元素的第一个 li 元素
`$("ul li:first-child")`  选取每个 ul 元素的第一个 li 元素
`$("[href]")`   选取带有href属性的元素
`$("a[target='_blank']")` 选取所有 target 属性值等于 _blank 的 a 元素
`$(":button")` 选取所有 type="button" 的元素
`$("tr:even")` 选取偶数位置的 tr 元素

## 事件

页面对不同访问者的响应，触发事件

常见事件：
![事件](./img/1.jpg)

$("p").click(function(){
    // 动作触发后执行的代码
});

`$(document).ready()`  在文档完全加载完后执行函数
   click()   点击事件触发
   dblclick() 双击元素
   mouseenter() 鼠标指针经过元素
   mouseleave() 鼠标指针离开元素
   mousedown() 按下鼠标按键
   mouseup() 松开鼠标按钮
   hover() 光标悬停
   focus() 元素获得焦点
   blur() 元素失去焦点

## jQuery效果

### 隐藏和显示

hide() 隐藏
show() 显示
toggle() 切换显示和隐藏方法，显示被隐藏的元素，隐藏被显示的元素

`$(selector).hide(speed,callback);`
`$(selector).show(speed,callback);`
`$(selector).toggle(speed,callback);`
speed：速度（slow、fast、ms）
callback：回调函数

```javascript

$("div").hide(1000,"linear",function(){
      alert("Hide() 方法已完成!");
});
```

### 淡入和淡出

fadeIn() 淡入已隐藏的元素，慢慢显示
fadeOut() 淡出可见元素，慢慢隐藏
fadeToggle() 切换淡入和淡出方法
fadeTo() 渐变为给定的不透明度 0-1

`$(selector).fadeTo(speed,opacity,callback);`

### 滑动

slideDown() 下滑元素
slideUp() 上滑元素
slideToggle() 切换上滑和下滑方法

### 动画

animate() 创建自定义动画

`$(selector).animate({params},speed,callback);`
params：定义形成动画的 CSS 属性(必须)
如果移动位置的话，把position设为 relative、fixed 或 absolute
height:'+=150px' 相对值用+=或-=
height:'toggle' 切换显示和隐藏

### 停止动画

stop() 停止动画或效果，默认清除在被选元素上指定的当前动画

`$(selector).stop(stopAll,goToEnd);`
stopAll：是否应该清除动画队列，默认false，仅停止活动的动画，允许任何排入队列的动画向后执行。
goToEnd：是否立即完成当前动画，默认false。

### Callback

在当前动画 100% 完成之后执行

### 链Chaining

在相同的元素上运行多条 jQuery 命令，一条接着另一条（可以换行写）
`$("#p1").css("color","red").slideUp(2000).slideDown(2000);`

## jQuery HTML

### 捕获 设置

获取内容和属性

text() - 设置或返回所选元素的文本内容
html() - 设置或返回所选元素的内容（包括 HTML 标记）
val() - 设置或返回表单字段的值
attr() - 获取属性值

设置内容和属性

text("hello") - 设置或返回所选元素的文本内容
html("<p></p>") - 设置或返回所选元素的内容（包括 HTML 标记）
val("") - 设置或返回表单字段的值
attr("href","https://www.baidu.com/") - 设置属性值

### 添加元素

append() - 在被选元素的结尾插入追加内容，在元素内部嵌入
prepend() - 在被选元素的开头插入内容
after() - 在被选元素之后插入内容
before() - 在被选元素之前插入内容

### 删除元素

remove() - 删除被选元素（及子元素）
empty() - 从被选元素中删除子元素

### CSS类

获取并设置CSS类
addClass("") - 向被选元素添加一个或多个类
removeClass("") - 从被选元素删除一个或多个类
toggleClass("") - 对被选元素进行添加/删除类的切换操作
css("") - 设置或返回样式属性

### css()方法

`$("p").css("background-color","yellow");`
设置多个CSS属性
`$("p").css({"background-color":"yellow","font-size":"200%"});`

### 尺寸

width()
height()
innerWidth()
innerHeight()
outerWidth()
outerHeight()

![事件](./img/2.jpg)

## jQuery 遍历

树遍历（tree-traversal）

向上遍历 DOM 树：
parent() 返回被选元素的直接父元素
parents() 返回被选元素的所有祖先元素
parentsUntil() 返回介于两个给定元素之间的所有祖先元素

向下遍历 DOM 树：
children() 返回被选元素的所有直接子元素
find() 返回被选元素的后代元素

水平遍历：
siblings() 返回被选元素的所有同胞元素
next() 返回被选元素的下一个同胞元素
nextAll() 返回被选元素的所有跟随的同胞元素
nextUntil() 返回介于两个给定参数之间的所有跟随的同胞元素
prev()
prevAll()
prevUntil()

过滤：
first() 返回被选元素的首个元素
last()
eq(0) 返回被选元素中带有指定索引号的元素
filter() 规定一个标准。不匹配这个标准的元素会被从集合中删除，匹配的元素会被返回
not() 返回不匹配标准的所有元素

## jQuery Ajax

AJAX 是与服务器交换数据的技术，在不重载全部页面的情况下，实现了对部分网页的更新
AJAX = 异步 JavaScript 和 XML
(在不重载整个网页的情况下，AJAX 通过后台加载数据，并在网页上进行显示)

## load()

从服务器加载数据，并把返回的数据放入被选元素中

`$(selector).load(URL,data,callback);`
url：必写
data：与请求一同发送的查询字符串键值对集合
callback：回调函数

回调函数的参数：
  responseTxt - 调用成功时的结果内容
  statusTXT - 调用的状态
  xhr -  XMLHttpRequest 对象

```javascript

 $("#div1").load("demo_test.txt",function(responseTxt,statusTxt,xhr){
    if(statusTxt=="success")
      alert("外部内容加载成功!");
    if(statusTxt=="error")
      alert("Error: "+xhr.status+": "+xhr.statusText);
  });
```

### get() post()方法

GET - 从指定的资源请求数据，从服务器获得数据，可能返回缓存数据
POST - 向指定的资源提交要处理的数据，连同请求一起发送数据

$.get() ：通过 HTTP GET 请求从服务器请求数据

`$.get( URL [, data ] [, callback ] [, dataType ] )`
url：必写
data：发送给服务器的字符串或键值对
callback：载入成功时回调函数
dataType：从服务器返回的数据类型，xml json script html text

$.post() ：通过 HTTP POST 请求向服务器提交数据

`$.post( URL [, data ] [, callback ] [, dataType ] )`
同上
