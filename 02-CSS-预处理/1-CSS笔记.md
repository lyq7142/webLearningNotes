# CSS层叠样式表 Cascading Style Sheets

* 样式类型：行内、内联、外部
外部引入CSS方式：link标签（推荐）、@import
@import一定要写在除@charset外的其他任何 CSS 规则之前，如果置于其它位置将会被浏览器忽略，而且，在@import之后如果存在其它样式，则@import之后的分号是必须书写，不可省略的。

* link 和 @import 的区别
1.从属关系区别
@import是 CSS 提供的语法规则，只有导入样式表的作用；link是HTML提供的标签，不仅可以加载 CSS 文件，还可以定义 RSS、rel 连接属性等。
2.加载顺序区别
加载页面时，link标签引入的 CSS 被同时加载；@import引入的 CSS 将在页面加载完毕后被加载。
3.兼容性区别
@import是 CSS2.1 才有的语法，故只可在 IE5+ 才能识别；link标签作为 HTML 元素，不存在兼容性问题。
4.DOM可控性区别
可以通过 JS 操作 DOM ，插入link标签来改变样式；由于 DOM 方法是基于文档的，无法使用@import的方式插入样式。
5.权重区别
link引入的样式权重大于@import引入的样式。

## 背景属性

* 大背景图、小图标

  ```css
  background-color: transparent;    /*（默认）透明，定义：十六进制、RGB、颜色名*/
  background-image: url('img/paper.jpg');  /*（默认）none，（css3新增）*/
  background-repeat: no-repeat;   /*（默认）平铺repeat，repeat-x/y*/
  background-attachment: fixed;   /*（默认）滚动scroll，图像固定fixed*/
  background-position: x y;       /*方位名词（top left） 或 精确单位(px)*/
  /*css3新增*/
  backgroud-size: 宽 高;          /*图片大小
        像素     常用
        百分比   相对于当前盒子宽高百分比
        contain 包含，等比例缩放，直到不会超出盒子最大，盒子可能留白
        cover   覆盖，等比例缩放，刚好填满盒子，图可能显示不全 */
  background-origin: content-box;  /*指定背景图位置区域，border-box content-box padding-box*/
  background-clip: content-box;   /*背景裁切*/
  ```

* 背景复合
  background: 颜色 **图片地址 平铺** 图像滚动 图片位置；
  background: #fff **url('paper.jpg') no-repeat** fixed center top;

* 背景颜色半透明，盒子内容不受影响
  background: rgba(0, 0, 0, 0.3) ;      // alpha透明度，取值 0~1

## 文字样式

### 字体 font

* serif 和 sans-serif：后者（无衬线）更容易阅读

```css
  font-family: Arial , Helvetica , sans-serif ;   /*优先级调用，浏览器不支持就会尝试下一个字体*/
  font-style: normal ;     /*正常显示文字，italic斜体字显示的文本*/
  font-size: 20px;      /*文字大小，默认16px*/
  font-weight: 400 | 700 ;     /*normal正常、bold加粗*/
```

* 字体复合
  font: font-style font-weight **font-size**/line-height **font-family** ;
  font: 20px/1.5 Arial ;

### 文本格式 text

```css
  color: #fff ;     /*十六进制，RGB，颜色名*/
  text-align: center ;     /*文本水平对齐，left right justify两端对齐 auto默认*/
  text-decoration: none ;       /*设置或去除装饰线，overline underline*/
  text-transform: uppercase;     /*转换大小写，lowercase小写， captyalize单词首字母大写*/
  text-indent: 2em ;       /*文本首行缩进，2em缩进元素2个字大小，可以是px*/
  line-height: 26px ;      /*文本高度 默认16px，上下间距各5px，总共26px，单位可px、不写、% */
  letter-spacing: 2px;     /*字符间距*/
  word-spacing: 30px;      /*单词间距*/
  /*css3新增*/
  text-shadow:  h-shadow  v-shadow  blur  color;   /*水平 垂直 模糊距离 颜色*/
  text-shadow: 1px 1px 5px rgba(0 , 0 , 0 , 0.3) ;  /*透明度 0-1*/
  word-wrap: break-word;   /*强制长文本换行*/
  word-break: keep-all;    /*单词不拆分，break-all单词拆分换行*/
```

## 元素选择模式

### 块级元素   div p h1-h6 table form ul ol li dl dt dd

* 默认宽度是父级的100%，可以设置宽高边距，独占一行
* 特殊：`<p>`里不能包含`<div>`

### 行内元素   span a b i input select strong

* 默认宽度是自身内容宽度，不能直接设宽高，只能容纳文本或其它行内元素
* 特殊：`<a>`里可以放块级元素，但转换块级更安全

### 行内块元素   img input td button select textarea

* 默认宽度是自身内容宽度，宽高、内外边距可设置
* 一行内可以放多个行内块元素，但会有间隙

* 模式转换：
  * 转换为块元素         display: block;
  * 转换为行内元素       display: inline;
  * 转换为行内块元素     display: inline-block;

* 可替换元素：一般有内置尺寸和宽高比，显示的内容由元素的标签和属性确定的，如img显示的内容实际上就是由src属性的值读取图片的信息并展示的，iframe,video,embed,img,input都是可替换元素。
几乎所有替换元素都是行内元素，替换元素有内在尺寸，所以可以设置width和height。如果不设置其宽度和高度时，就按照其内在尺寸显示。

* 空void元素：没有内容的元素，在开始标签就关闭的元素，不成对出现的标签，如 br hr img input link meta

## 选择器

* 基础选择器：标签、类、id、通配符 （<>  .  #  * )
* 复合选择器：后代、子元素、并集、伪类
  * 后代（包含）选择器:   ul  li {}
  * 子元素选择器:        ul > li {}   //只选儿子，不选孙子
  * 并集选择器：       p, div, span {}
  * 伪类选择器 :link  :visited  :hover :active
* 属性选择器
`input[value]{}`        //选择具有value属性的input元素
`input[value=text]{}`   //选择value="text"的input元素
`div[class^=icon]{}`    //匹配以icon开头的div元素
`div[class$=on1]{}`     //匹配以on1结尾的div元素
`div[class*=co]{}`      //匹配含有co的div元素
`div[class~=con]{}`     //匹配含有con独立单词的div元素

## 伪类 pseudo-classes

### 链接 anchor伪类

一般前两个不用下划线，text-decoration: none;

| 链接四种状态 |  要按顺序声明lvha(love & hate) |
|-------------|-------------------------------|
| a:link      | 未被访问                      |
| a:visited   | 已被访问                      |
| a:hover     | 鼠标经过                      |
| a:active    | 链接被点击的那一刻             |

### 结构伪类选择器（css3新增）

常用于根据父级选择子元素
`ul li:first-child {}`     //选择ul里第一个孩子
`ul li:nth-child(n) {}`     //选择ul里第n个孩子 ，括号里可以是数字、关键字（even偶数，odd奇数），公式（n=1,2...），2n偶数，2n+1奇数,n+5从第五个开始，-n+5前五个

* nth-child会把所有的盒子都排列序号，执行时首先看div:nth-child(1),之后看前面div >>不匹配
* nth-of-type会把指定元素的盒子排序号，先看div指定的元素，再看nth-of-type(1) >>匹配

## 伪元素（css3新增）

::before  在元素内容前面插入新内容
::after   在元素内容后面插入新内容

before、after创建一个元素，但属于行内元素，在dom tree中找不到，称为**伪元素**。
必须有content属性，伪元素选择器权重为1。css创建标签效果。

## 伪类 和 伪元素 的区别

1. 伪类
其核⼼就是⽤来选择DOM树之外的信息,不能够被普通选择器选择的⽂档之外的元素，⽤来添加⼀些选择器的特殊效果。⽐如:hover :active :visited :link :first-child :focus :lang等
由于状态的变化是⾮静态的，所以元素达到⼀个特定状态时，它可能得到⼀个伪类的样式；当状态改变时，它⼜会失去这个样式。
由此可以看出，它的功能和class有些类似，但它是基于⽂档之外的抽象，所以叫 伪类。
2. 伪元素
DOM树没有定义的虚拟元素，核⼼就是需要创建通常不存在于⽂档中的元素，⽐如::before ::after 它选择的是元素指定内容，表示选择元素内容的之前内容或之后内容。
伪元素控制的内容和元素是没有差别的，但是它本身只是基于元素的抽象，并不存在于⽂档中，所以称为伪元素。⽤于将特殊的效果添加到某些选择器
3. 伪类与伪元素的区别
伪类和伪元素都是⽤来表示⽂档树以外的"元素"。
伪类和伪元素分别⽤单冒号:和双冒号::来表示。
伪类和伪元素的区别，关键点在于如果没有伪元素(或伪类)，是否需要添加元素才能达到效果，如果是则是伪元素，反之则是伪类
伪类和伪元素都不出现在源⽂件和DOM树中。也就是说在html源⽂件中是看不到伪类和伪元素的。
伪类其实就是基于普通DOM元素⽽产⽣的不同状态，是DOM元素的某⼀特征。
伪元素能够创建在DOM树中不存在的抽象对象，⽽且这些抽象对象是能够访问到的。

## 列表

* 列表项标志类型：
ul无序：
  list-style-type: circle;    // 空心圆，square黑方块，disc实心圆
ol有序：
  list-style-type: upper-roman;   //罗马数字，lower-alpha小写英文
* 去掉 li 元素前面的圆点   list-style: none;

## 表格

```css
border: 1px solid red;        // 边框
border-collapse: collapse;    // 折叠表格边框，变成单一边框
text-align: center;           // left right   水平对齐
vertical-align: middle;       // bottom top   垂直对齐
```

## CSS三大特性

### 1 层叠性

样式不同：叠加
样式相同：后边的覆盖前面的（选择器优先级相同时）

### 2 继承性

* 子继承父的某些属性
  行内元素可以继承： font系列 文本系列 color line-height...（除text-indent,text-align之外）
  块级元素可以继承：text-indent text-align
  所有元素都可继承：visibility cursor
  
特殊：a标签的color  h1-h6的font-size属性 会继承失效

行高继承：可以没有单位
  父  font: 12px/1.5 Arial;  //行高：元素文字大小的1.5倍
  子  font: 14px;    // 如果子元素没有设置文字大小，行高：12*1.5

### 3 优先级

CSS 权重优先级顺序简单表示为：
!important > 行内样式 > ID > 类、伪类、属性 > 标签名 > 通配符 > 继承

选择器的权重： 永远不会进位

| 选择器           | 权重（低->高）            |
| ---------------- | ------------------------ |
| 继承  通配符*     | 0，0，0，0 （相当于默认）  |
| 标签<>           | 0，0，0，1                |
| 类. 伪类: 属性[]  | 0，0，1，0                |
| #id              | 0，1，0，0                |
| 行内style=""     | 1，0，0，0                |
| !important       | ∞无穷大                   |

* 权重的叠加
.div p  的权重 0，0，1，1     // 类0010和元素0001叠加
a:hover 的权重 0，0，1，1     // 元素0001和伪类0010叠加

## 盒子模型 box model

margin  border  padding  content
css盒模型：标准w3c模型 + IE模型
标准模型：盒子总宽度= width + padding + border + margin
IE盒模型：盒子总宽度= width + margin   (width包括padding和border)
<!-- css3新增 -->
`box-sizing: content-box;`   //（默认）标准盒模型
`box-sizing: border-box;`     //IE盒模型，盒子大小不会被边距撑大

### 获取盒模型宽高

dom.style.width 只能取行内样式的宽
dom.currentStyle.width 只有IE兼容，最终渲染后的宽
dom.getComputedStyle(dom).width 多浏览器支持，IE9+
window.getBoundingClientRect().width 多浏览器支持，IE9+
**dom.offsetWidth** 不包括外边距，常用，兼容性最好

### 边框 border

* 边框复合 `border: 1px solid red;`

```css
border-style: none ;   /* (默认)无边框，solid实线，虚线dashed，点线dotted */
border-width: 1px ;    /* 边框宽度*/
border-color: red ;    /* 边框颜色，单独写不起作用，得先用border-style */
/* css3 */
border-radius: 10px;  /* 边框圆角，50%正圆，椭圆与边框的交集形成圆角效果 */
 /* 两个值： 角13  24     左上为1，顺时针
    三个值： 角1  24  3
    ​四个值： 角1 2 3 4 */
border-image:url() 30 30 round;
```

* 轮廓 outline
位于边框边缘的外围，突出元素，不占空间，不增加额外的宽高。
`outline: 0 | none;`   //获得光标时，不显示默认变化边框
`outline-offset: 15px;`   //对轮廓进行偏移，在超出边框位置绘制

### 盒阴影 box-shadow（css3新增）

box-shadow: h-shadow v-shadow blur spread color inset ;

| h-shadow   | v-shadow   | blur   | spread   | color    | inset内部阴影   |
| ---------- | ---------- | ------ | -------- | -------- |  -------------- |
| 水平阴影位置 | 垂直阴影位置 | 模糊距离 | 阴影大小 | rgba | 默认outset,不能写|

`box-shadow: 1px 1px 5px 2px rgba( 0, 0, 0, .3);`

### 内外边距 padding margin

```css
  padding：5px ;                 /*上下左右*/
  padding: 5px 10px ;            /*上下，左右*/
  padding: 5px 10px 20px ;       /*上，左右，下*/
  padding: 5px 10px 20px 30px；  /*上右下左*/
  margin: 10px;     /*同上*/
```

* 边界重叠：两个或多个盒子(可能相邻也可能嵌套)的相邻边界(其间没有任何非空内容、补白、边框)重合在一起而形成一个单一边界。
原因：如果块元素的 margin-top 与它的第一个子元素的 margin-top 之间没有 border、 padding、inline content、 clearance 来分隔，或者块元素的 margin-bottom 与它的最后一个子元素的margin-bottom 之间没有 border、 padding、 inline content、 height 分隔，那么外边距会塌陷。子元素多余的外边距会被父元素的外边距截断。

  * 相邻块元素垂直外边距合并 - 尽量只给一个盒子添加margin值
    上下两个盒子，上面的盒子margin-bottom: 100px ; 下面的盒子 margin-top: 200px ;
   <!-- 二者垂直间距不是300px，而是200px，取二者之间较大者 -->

  * 嵌套块元素垂直外边距塌陷 - 当父子元素都有margin-top时，父元素会塌陷其中较大的外边距值
    解决方法：父元素添加 border/padding/overflow: hidden; /浮动 固定 绝对定位

## 网页布局

* 普通流（标准流）- 元素按默认方式排列

### 浮动 float

* 优点：让多个块级元素一行显示，且无间隙 - 如果转为行内块有间隙
* 第一准则：多个块级元素纵向排列找标准流，横向排列找浮动。
* float创建浮动框，将盒子移动到一侧，直到左/右边缘 触及 块元素/其它浮动框边缘。

* 浮动特性
脱标：浮动元素脱离标准流，移到指定位置。浮动盒子不再保留原先位置(脱标)。
浮动元素一行内显示，且顶部对齐，屏幕装不下另起一行。
具有行内块元素特性，行内元素有浮动就不用转换，可以直接设宽高。

* 浮动块级元素如果未设置宽度，大小由内容决定。
* 浮动元素和标准流父级搭配 - 父元素排列上下，子元素浮动排列左右
**浮动盒子只影响它后面的标准流，不影响前面的标准流**（独占一行）

* 盒子塌陷
当父元素没设置足够大小的时候，而子元素设置了浮动的属性，子元素就会跳出父元素的边界（脱离文档流），尤其是当父元素的高度为auto时，而父元素中又没有其它非浮动的可见元素时，父盒子的高度就会直接塌陷为零。
-解决方法：盒子设置固定宽高；父盒子也浮动；父盒子添加border；父盒子设置padding-top；清除浮动。

* **清除浮动方法**
clear: both;  // 同时清除左右两侧浮动的影响
1.额外标签法（末尾标签法，内部标签法）
  最后的浮动元素后面加空标签 `<br style="clear: both;" />`// 引入不必要的冗余元素
2.父级添加overflow: hidden|auto|scroll;
3.父级添加after伪元素 // 相当于额外标签法的升级 `<div class="box1 clearfix">`

```css
.clearfix:after{   /*生成一个盒子放在浮动元素后面*/
    content: ".";     /*伪元素必写，尽量不为空*/
    display: block;  /*插入元素须为块级，伪元素默认是行内 */ 
    height: 0;       /*看不见元素*/
    clear: both;     /*清除浮动核心代码*/
    visibility: hidden;  /*content有内容，隐藏元素*/
  }
  .clearfix{    /*IE6、7专有，兼容性*/
    *zoom: 1; /*将元素缩放至原来 1 倍的大小*/
  }   
```

4.父级添加双伪元素（推荐）

```css
.clearfix:before, .clearfix:after {   /*在大盒子内部左右都放盒子 防止浮动*/
  content: "";
  display: table;
  /* line-height: 0;  */
}
.clearfix:after { clear: both; }
.clearfix{ *zoom: 1; }
```

## BFC 块级格式化上下文 （边距重叠解决方案）

Block Formatting Context，是一个独立的渲染区域，里面的元素不会影响外面，也不会被外面影响。父子和兄弟元素边距重叠，重叠原则取最大值。

* BFC原理（渲染|布局规则）：
内部box在垂直方向从顶部一个个放置；
box垂直方向距离由margin决定，同一个BFC的两个相邻box外边距会重叠；
每个元素左边与包含块的左边接触；
区域不会与浮动盒子重叠（清浮动）；
计算BFC高度时，浮动元素参与计算。

* CSS创建出BFC的情况（脱离文档流）：
根元素，float不为none，position为absolute/fixed（不占位），display为inline-block table flex ... ，overflow不为visible

* BFC作用：自适应两三栏布局、避免元素被浮动元素覆盖、让父元素高度包含子浮动元素，清除内部浮动、去除边距重叠现象

## css 属性书写顺序

目的：减少浏览器回流，提升浏览器渲染dom性能

1. 布局定位属性：display / position / float / clear / visibility / overflow
2. 自身属性：width / height / margin / padding / border / background
3. 文本属性：color / font / text-decoration / text-align / vertical-align / white-space / break-word
4. 其它属性(c3)：content / cursor / border-radius / box-shadow

## 定位 position

属性：static relative absolute fixed sticky
让盒子自由的在某个盒子内移动 或 固定在屏幕中某个位置，并且可以压住其它盒子。

* static 默认无定位，标准流，不会受到top left等影响。

* **相对定位relative**

  1. 仍然占有原来的位置（不脱标）
  2. 相对于原来的位置移动
  3. 可以作为绝对定位的父元素，限制它

* **绝对定位absolute**

  1. 不再占有原来的位置（脱标）
  2. 相对于祖先元素（最近一级带有定位的盒子为参考点）移动
  3. 给它的父元素加相对定位

* 子绝父相：相对定位元素经常被用来作为绝对定位元素的容器块。
  父盒子加relative，需要占有位置，防止下面的盒子往上。
  子盒子加absolute，能在父盒子任意位置，不会影响兄弟盒子。

* **固定定位fixed**  （特殊的绝对定位）
  元素固定于浏览器可视区的位置，页面滚动时元素位置不会改变
  以浏览器的可视窗口为参照点移动，跟父元素没有任何关系（脱标）

* 固定导航栏
  width:100%;
  position:fixed;
  top:0; 顶部导航栏   // bottom:0;底部
  left:0;

* 粘性定位sticky
  元素基于用户滚动，以浏览器可视窗口为参照点移动，占用原先的位置。
  在跨越特定阈值前相对定位，之后固定定位。
  特定阈值：上下左右属性之一，必须指定一个才能生效
    top: 10px;    // 滚动到距离顶部10px开始粘性定位

* 重叠的元素   z-index 指定一个元素的堆叠顺序
  z-index: 0;（z轴，默认0）
  值相同的话，按照书写顺序
  只有定位的盒子（相对，绝对，固定）才有这个属性

* **布局（盒子水平垂直居中）**

```css
1.父盒子flex布局
    display: flex;
    justify-content: center;
    align-items: center;
2.子绝父相
    父 position: relative;
    子  position: absolute;
        top:50%;
        left:50%;
        -webkit-transform: translate(-50%,-50%); //或 margin-left: -自身宽度;
3.table
    父 display: table;
       text-align: center;
    子 display: table-cell;
        vertical-align: middle; 
```
  
* 行内元素有absolute/fixed，可以直接设宽高
* 块级元素未设置宽高，加了定位，默认内容大小，不再独占一行
* absolute/fixed会完全压住盒子，浮动则不同，只会压住下面的标准流盒子，不会压住文字/图片

* 块级盒子水平居中
  盒子必须有宽度  margin: 0 auto ;

* 文本水平居中
  父元素 text-align: center; 只针对容器里的文字与行内（块）容器，具有向下传递性，不断向子元素传递。
* 单行文本垂直居中
  把line-height设置成盒子height大小，也可以不设置height ，盒子可以撑开，利用上下间距相等原理
* 多行文本垂直居中
  父级高度不固定，通过内部文本撑开，设置padding上下相等
  父级高度固定，verticle-align: middle;    display: table-cell;

### overflow

控制内容溢出元素框时 在对应元素区间内添加滚动条。
值：（默认）visible(不剪切内容、不添加滚动条)，hidden(超出部分隐藏)，scroll(总是显示滚动条)，auto(溢出时才显示滚动条)

### 溢出文字省略号显示

1.单行文本

```css
white-space: nowrap;     /*不换行显示文本，默认normal自动换行*/
overflow: hidden;        /*超出部分隐藏*/
text-overflow: ellipsis;  /*省略号代替隐藏部分，clip:直接裁切（css3新增）*/
```

2.多行文本  //兼容差，适合后端做

```css
overflow: hidden;
text-overflow: ellipsis; 
display: -webkit-box;      /*弹性伸缩盒子模型显示,box-flex，父元素设置该属性，子代能排列在同一水平上*/
-webkit-line-clamp: 2;       /*限制块元素显示的文本行数*/
-webkit-box-orient: vertical;   /*设置、检索伸缩盒对象的子元素排列方式，竖排*/
```

### 元素的 显示display 和 可见性visibility

1. display: none;     //none隐藏对象（不再占有原来位置，导致重排重绘），block显示元素
2. visibility: hidden;     //hidden隐藏（仍然占有原来位置，导致重绘，不重排），visible可视
3. overflow 溢出
4. opacity:0;      //占据空间保留，可以触发点击事件
5. 盒子宽高设为0；位置设置到屏幕外；z-index设置很小的负数...

## 精灵图

* 网页中图像过多时，服务器频繁接收请求发送图片，服务器压力过大，降低页面加载速度，所以需要css精灵技术（css sprites、css 雪碧）
* 核心原理：将小背景图整合到一张大图里，只要请求一次
* 移动背景图位置background-position: -x, -y ;坐标，一般往左上方移动，取负值

* css三角

```css
box {
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: red; 
}
/* css三角强化，∟ */
width: 0;
height: 0;
border-color: transparent red transparent transparent;
border-style: solid;
border-width: 50px 25px 0 0;
```

## 用户界面

* 更改鼠标样式 cursor: pointer;

| default      | pointer | move   | text | not-allowed |
| ------------ | ------- | ------ | ---- | ----------- |
| （默认）箭头  | 手      | 移动盘 | 文本  | 禁止        |

* 防止表单域拖拽(css3)
`resize: none;`  // 指定元素是否该由用户调整大小，both

* 垂直对齐，文字和图片，针对行内（块）元素  `vertical-align: middle;`

| baseline                     | top                            | middle             | bottom                         |
| ---------------------------- | ------------------------------ | ------------------ | ------------------------------ |
| (默认)元素放在父元素基准线上 | 元素顶部和行中最高元素顶部对齐 | 元素放在父元素中部 | 元素顶部和行中最低元素顶部对齐 |

* 去除图片底侧空白缝隙   //浏览器遇到行内（块）标签当作文字（基线对齐）处理
1.img{vertical-align: middle;}
2.img{display: block;}
3.box{line-height:0;}
4.img{display:flex;font-size:0;}

* margin负值
多个盒子相邻，如果都有1px边框，间隔边框会是2px
`margin-left: -1px;`
鼠标经过盒子时，若有定位，提高z-index；无定位就加relative，可以占位置，压住其它标准流

* 文字围绕浮动元素
图片的盒子加  `float: left;`

* 画0.5px直线
1.scale缩放   `height: 1px;  transform: scaleY(0.5);`
2.linear-gradient  `background: linear-gradient(0deg, #fff, #000)`
3.box-shadow   `box-shadow: 0 0.5px 0 #000;`
4.viewport   `<meta name="viewport" content="width=device-width,initial-sacle=0.5">`

## CSS3 新特性

### text-wrap属性 （自动换行）

normal 只在允许的换行点进行换行
none 不换行，超出溢出
break-word 在任意两个字符间换行
suppress 压缩元素中的换行

### 多列

column-count: 3   元素被分隔的列数
column-gap: 40px  列之间的间隔

### 渐变 gradient

* 线性渐变linear   //默认从上到下
  background-image: linear-gradient(direction, color-stop1, color-stop2,...) ;
  `background-image: linear-gradient(to right, red, blue);`       //从左到右
  `background-image: linear-gradient(0deg, red, blue);`    //0deg从下往上，90deg从左往右
* 径向渐变radial
  background-image: radial-gradient(shape size at position, start-color, ..., last-color);
  shape      // circle圆,（默认ellipse椭圆）
  size       //closest-side, farthest-side ...
  `background-image: radial-gradient(red 5%, yellow 15%, green 60%);`    //节点不均匀分布

### 图片滤镜 filter

filter: blur(5px);        //blur模糊程度
filter: grayscale(100%);  //网站灰色滤镜

### 过渡 transition

过渡：元素从一种样式逐渐变为另一种效果。
transition-delay 开始时间，默认0
transition-duration 花费时间，默认0
transition-property  属性名
transition-timing-function  时间曲线，默认ease  //linear线性
简写：
transition: **要过渡的属性  花费时间s** 运动曲线  开始时间s;
`transition: width 2s, height 2s, transform 2s;`
`transition: all 0.5s;`

### 2D转换  transform

`transform: translate(50px,100px);`  -位移
`transform: rotate(30deg) ;`   - 顺时针旋转30度
`transform: scale(2,3) ;`   - 宽度变为原来的两倍，高度三倍
`transform: skew(30deg,20deg);`  -倾斜角度

### 3D转换

transform: rotateX(120deg);
transform: rotateY(130deg);

### animation 动画

1.关键帧（@keyframes）- 定义动画在不同阶段的状态，主要分三阶段 0%，50%，100%

```css
 @keyframes myfirst
  {
  from {background:red;}
  to {background:yellow;}
 }
```

2.动画属性（properties）- 动画播放时长，次数，函数式
`animation: name duration timing-function delay iteration-count direction fill-mode play-state;`
animation: myfirst 5s linear 2s infinite alternate;
| 属性            | 值                                                           |
| --------------- | ------------------------------------------------------------ |
| **name**        | 动画名称                                                      |
| **duration**    | 完成时间（默认0s，没有动画效果）                                |
| time-function   | 完成一个周期速率变化，linear匀速，ease-in低速开始               |
| delay           | 动画启动前的延迟间隔，（默认0）                                 |
| iteration-count | 播放次数，infinite循环，n次数（默认1）                          |
| direction       | 轮流反向播放，normal正常，reverse反向                           |
| fill-mode       | 不播放时的状态，forwards停在最后一帧（默认none，停在起始位置）    |
| play-state      | 是否正在运行或已暂停，paused指定暂停（默认running，指定运行的动画）|

3.css属性 - 元素在不同关键帧下的状态

```css
 @keyframes ball {
            0% { top: 0px; left: 0px;}
            25% { top: 0px; left: 350px;}
            50% { top: 200px; left: 350px;}
            75% { top: 200px; left: 0px;}
            100% { top: 0px; left: 0px;} 
        }
        div {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            border: 3px solid black;
            position: relative;
            animation-name: ball;
            animation-duration: 2s;
        }

```
