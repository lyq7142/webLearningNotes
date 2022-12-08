# HTML5

* 新特性：
    canvas绘画
    video audio媒介回放
    本地离线存储
    语义化标签（article header nav section footer）
    表单控件（calendar date time email url search）

* 移除元素：
    center big s u tt dir font frame ...

* 声明 文档第一行：`<!DOCTYPE html>`
中文网页：meta charset="utf-8"声明编码

## h5 Canvas画布

canvas 定义图形、图表等，基于js的绘图API，用脚本js绘制。
创建画布：`<canvas id="myCanvas" width="200" height="100" style="border:1px solid #000;"></canvas>`
绘图：

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");  //创建对象，拥有很多绘制方法
ctx.fillstyle="#FF0000";  //默认黑色，属性可以是css颜色，渐变，图案
// 坐标
ctx.fillRect(0,0,150,75);  //矩形的填充方式 (x,y,width,height)，绘制150×75的矩形，从左上角（0，0）开始
// 路径
ctx.moveTo(0,0);  // 线条开始坐标
ctx.lineTo(200,100); // 线条结束坐标
ctx.stroke(); // 绘制线条
ctx.beginPath();
ctx.arc(95,50,40,0,2*Math.PI);  // (x,y,r,start,stop)
ctx.stroke();  //绘制圆形
ctx.font="30px Arial";  //定义字体
ctx.fillText("Hello World",10,50); //绘制文本（实心）
ctx.strokeText("Hello World",10,50); //绘制文本（空心）
// 图像
var img=document.getElementById("scream");
ctx.drawImage(img,10,10); 
```

## h5 SVG

可缩放矢量图形（Scalable Vector Graphics），定义用于网络的基于矢量的图形。
XML格式定义图形，放大图像时图形质量不会损失，w3c标准。

优点：图像可通过文本编辑器创建和修改，可被搜索、压缩、脚本化，可伸缩，图片质量不会下降

```html
<!-- 圆形 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

## h5 Video & Audio

video audio source embed track
source元素可以链接不同的视频文件，浏览器将使用第一个可识别的格式。

```html
<video width="320" height="240" controls>
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
您的浏览器不支持Video标签。
</video>

<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
您的浏览器不支持 audio 元素。
</audio>

```

## h5 Input 类型type

color 取色
date datetime datetime-local 选择日期、UTC时间、选择日期和时间
email 提交表单时，自动验证email域值是否合法
month 选择月份
number 限定数字输入范围，`<input type="number" min="1" max="5" pattern="验证输入字段模式">`
range 滑动条，控制数值输入域，`<input type="range" min="1" max="10" value="默认值">`
search 搜索域
tel 电话号码
time 选择时间
url 提交表单，自动验证url域值
week 选择周和年

## h5 表单元素

keygen 验证用户，规定用于表单的密钥对生成器字段。
output 不同类型的输出
datalist 输入域的选项列表，规定自动完成功能，用户输入的提示选项。

```html
<input list="browsers">
 
<datalist id="browsers">
  <option value="Internet Explorer">
  <option value="Firefox">
  <option value="Chrome">
  <option value="Opera">
  <option value="Safari">
</datalist>
```

## h5 表单属性

* form新属性
autocomplete 规定form或input域拥有自动完成功能，autocomplete="on"/"off"
novalidate 提交表单时不验证form或input域，novalidate
* input
autocomplete
autofocus 页面加载时，域自动获取焦点
form
formaction 表单提交的url地址
formenctype
formmethod
formnovalidate
formtarget
height 与 width 只适用于图像型input标签
list
min 与 max
multiple
pattern (regexp)
placeholder
required
step

## h5 语义元素

header nav article section aside footer

```html
<body>
 <header>主题</header>
 <nav>连接菜单</nav>
 <article>
   主内容
   <section>
     章节段落
   </section>
 </article>
 <aside>侧边栏</aside>
 <footer>页脚</footer>
</body>
```
