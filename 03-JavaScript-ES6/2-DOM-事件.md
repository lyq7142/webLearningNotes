# DOM(Document Object Model)文档对象模型

​将标记语言文档的各个组成部分，封装为对象。可以用这些对象，对标记语言文档进行CRUD的动态操作。

* 操作元素：
    修改样式
    ​修改属性
    修改内容
    改变位置
    添加事件

* W3C DOM标准3个部分：
1.核心 DOM：针对任何结构化文档的标准模型
    Document：文档对象，一个页面就是一个文档
    Element：元素对象，页面中所有标签都是元素
    Attribute：属性对象
    Text：文本对象
    Comment：注释对象
    Node：节点对象（其它5个的父对象），网页中所有内容都是节点
2.XML DOM：针对XML文档的标准模型
3.HTML DOM：针对HTML文档的标准模型

## 1.Document

（1）获取元素对象的方法
document.getElementById()          根据 id名 获取对象
document.getElementsByTagName()    根据 标签名 获取对象们，返回值是伪数组
document.getElementsByClassName()  根据 类名 获取对象们，返回值是伪数组
<!-- h5新增 -->
document.querySelector()           根据 选择器 获取对象，返回满足的第一个元素
document.querySelectorAll()        根据 选择器 获取对象们，返回值是伪数组

## 2.Element

（2）操作元素内容
操作 文本内容：
    获取：元素.innerText
    设置：元素.innerText = '新内容'
操作 超文本内容：
    获取：元素.innerHTML
    设置：元素.innerHTML = '新内容'

（3）操作元素属性（不用来操作 类名class 和 样式style）
原生属性：id  type...
    获取：元素.属性名
    设置：元素.属性名 = '属性值'
自定义属性：
    获取：元素.getAttribute('属性名')
    设置：元素.setAttribute('属性名','属性值')
    删除：元素.removeAttribute('属性名')

（4）操作元素类名
    获取：元素.className
    设置：元素.className = '新类名'

（5）操作元素行内样式
    获取：元素.style.样式名
    设置：元素.style.样式名 = '样式值'
*当样式名带有中划线'-'时，改成小驼峰命名法，如background-color  ->   backgroundColor

（6）获取元素的非行内样式（也可以获取行内元素）
    window.getComputedStyle(元素).样式名

（7）获取元素尺寸
    元素.offsetHeight    //包含：元素内容 + padding + border
    元素.offsetWidth
    元素.clientHeight    //包含：元素内容 + padding
    元素.clientWidth

## 3.Node 节点操作

所有dom对象都可以被认为是一个节点。

创建节点  document.createElement('标签名');
插入节点  
    父节点.appendChild(子节点);     //将子节点添加到父节点中最后的位置
    父节点.insertBefore(要插入的子节点，插在哪个子节点前面);
删除节点
    ​父节点.removeChild(子节点);    //删除父节点内的某个子节点
    节点.remove();                //删除该节点
替换节点  父节点.​replaceChild(换上新节点，换下节点);
克隆节点  节点.cloneNode(是否克隆后代节点)   //默认false，不克隆后代节点
返回节点的父节点  parentNode  

## 4.事件

某些组件被执行某些操作后，触发某些代码的执行。
事件：某些操作。单击，鼠标经过，键盘按下...
事件绑定三要素：事件源、事件类型、事件处理程序

语法：事件源.on事件类型=事件处理函数
btn.onclick = function () {}

* 常见事件：

1.点击事件
onclick  单击
ondblclick  双击

2.鼠标事件
onmousedown  鼠标按下    // 定义方法时，定义一个形参，接收event对象，它的button属性可以获取，哪个鼠标按钮被点击，0 1 2 左 中 右键
onmousemove  鼠标移动
onmouseout  鼠标移开某元素
onmouseover  鼠标移到某元素上（经过）
onmouseup  鼠标按键被松开

3.键盘事件
onkeydown  按键被按下    //keycode==13回车键。可以按下后提交表单
onkeyup  按键被松下
onkeypress  键盘按键被按下并松开

4.浏览器事件
onload  一张页面或图片完成加载    // 一般等页面都加载完，再触发执行js代码
onscroll  滚动
onresize  浏览器被重置大小，变化

5.表单事件
onblur  失去焦点     // 一般用于表单验证，判断用户名是否已经存在。。。
onfocus  获得焦点
onchange  域的内容被改变   //下拉菜单，三级联动（省市区）改变内容
onselect   文本被选中
oninput   输入
onsubmit  确认按钮被点击     // 方法返回false可以阻止表单提交
onreset  重置按钮被点击

6.触摸事件
ontouchstart  触摸开始
ontouchmove  触摸移动
ontouchend  触摸结束

* 事件对象
当事件触发时，一个描述该事件信息的对象数据类型。
浏览器记录每次事件触发时的相关信息，如：

```javascript
{
    type:'click',
    target:<div></div>,
    x:100,
    y:100
}
// 直接在事件处理函数接收形参，可以拿到事件对象
div.onclick = funtion(e){
    console.log(e);
}
```

* 事件对象内的信息
1.鼠标事件
    offsetX  offsetY     //相对于触发事件的元素
    clientX  clientY     //相对于浏览器可视窗口
    pageX    pageY       //相对于页面文档流
2.键盘事件
    键盘编码   事件对象.KeyCode
    键盘键值表：enter回车键是13，space空格键是32

### 事件传播机制

* DOM事件模型
0级模型（原始事件模型）：事件不会传播，没有事件流的概念
        事件绑定监听函数：直接通过onclick写在html里；js代码指定属性值
2级模型：element.addEventListener('click',function(){},false)
    // 事件名，执行函数，(默认)冒泡false/捕获true
3级模型：增加了更多鼠标键盘事件

* addEventListener & onclick 区别
`document.getElementById("myDIV").addEventListener("click", myFunction);`
`document.getElementById("myDIV").onclick = myFunction;`
addEventListener可以对同一个元素绑定多个事件，从上到下依次执行；对任何DOM元素都有效；注册事件时不用写on；取消绑定用removeListener
onclick同一个元素只能绑定一个事件，如有多个，后面的事件会覆盖前面的事件。

* 事件流：网页上接收事件的顺序。
（浏览器默认冒泡行为）单击嵌套在其它元素中的目标元素时，会先触发目标元素上的click事件，再一层层触发事件，最终到达最顶层window对象。
事件流两种方式：
  事件捕获：由外往内，事件首先被最外层元素捕获，逐级往下触发，一直到最里面的DOM元素
  事件冒泡：由内往外，事件首先在目标元素上触发，逐级向上触发，直到最外层dom元素

```html
<ul id="emoji">
  <li id="smile">😀</li>
  <li>😁</li>
  <li>😂</li>
  <li>🤣</li>
  <li>😃</li>
  <li>😄</li>
</ul>
<script>
  emoji.onclick = function (e) {
    console.log(e.target.innerHTML)
  }  // 单击每个li标签，会得到其中的每个emoji--->事件委托
</script>
```

当一个事件发生后，会在不同DOM节点之间传播（propagation）。

* 事件传播三阶段：事件捕获阶段、目标阶段、事件冒泡阶段
捕获阶段：事件从document一直向下传播到目标元素，依次检查经过的节点是否绑定事件监听函数，如果有则执行
目标阶段：事件到达目标元素，触发目标元素的监听函数
冒泡阶段：事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行

这三个阶段的传播模型，会使得一个事件在多个节点上触发。

* 自定义事件

```js
var eve = new Event('test'); //通过new Event 创建事件
dom.addEventListener('test', function () { //注册事件
    console.log('test dispatch');
});
setTimeout(function () {
    dom.dispatchEvent(eve);  //触发事件
}, 1000);
```

### 事件代理（委托） event delegation

利用事件冒泡，把子元素的事件都绑定到父元素上，触发执行效果。
好处：节省内存占用，减少事件注册；新增子元素时，无需再对其进行事件绑定

### 阻止事件传播

事件对象 e.stopPropagation() // 阻止捕获和冒泡阶段中当前事件在DOM中进一步传播

### 取消默认事件

e.preventDefault()  // 取消浏览器对当前事件的默认行为
    表单元素中使用，它将阻止其提交
    锚元素中使用，它将阻止其导航
    上下文菜单中使用，它将阻止其显示或隐藏

```js
window.onload=function(){
    document.onclick=function (e) {
        //获取事件对象
        e = e || window.event;//IE和Chrome下是window.event FF下是e
        //获取事件源
        var target = e.target || e.srcElement;  //IE和Chrome下是srcElement FF下是target  
        // 防止默认行为
        if (e.preventDefault) {
            e.preventDefault();//IE以外
        } else {
            e.returnValue = false;//IE
        //注意：这个地方是无法用return false代替的
        //return false只能取消元素
        }   
        //阻止事件冒泡    
        if (e.stopPropagation) {
            e.stopPropagation();//IE以外
        } else {
            e.cancelBubble = true;//IE
        } 
    };
};
```
