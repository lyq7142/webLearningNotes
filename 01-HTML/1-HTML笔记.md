# HTML 超文本标记语言(Hyper Text Markup Language)

* 浏览器内核（渲染引擎）
Web标准：由W3C（万维网联盟）组织和其它标准化组织制定的一系列标准的集合。
原因：不同浏览器解析页面效果可能不一致。
渲染引擎：获取网页内容、整理信息，计算网页显示方式，输出显示器或打印机。
js引擎：解析和执行js实现网页动态效果。

* 基本结构

```html
<!-- 文档类型声明（XHTML或HTML的版本），必须在文档最顶部 -->
<!DOCTYPE html>
<!-- 根标签，lang语言：en英文，zh-CN中文 -->
<html lang="zh-CN">
  <!-- head是所有头部元素的容器，包括base,link,meta,script,style,title -->
  <head>
    <!-- http-equiv将信息写给浏览器执行：content-type,refresh,set-cookie -->
    <!-- charset字符集编码格式：utf-8万国码,gb2312简中,GBK -->
    <!-- name将信息写给搜索引擎：author,keywords,description -->
    <meta http-equiv="content-type" content="text/html charset=UTF-8" />
    <meta name="author" content="作者：http://www.baidu.com" />
    <meta name="keywords" content="网页关键字：html5，web前端开发" />
    <meta name="description" content="网页描述：搜索时，标题下的解释文字" />
    <!-- 必须在head内设置标题 -->
    <title>标题</title>
    <!-- rel声明文件间关系，type文件类型，href文件路径 -->
    <link rel="stylesheet" href="./css/index.css">
    <link rel="icon" href="favicon.ico" type="image/x-icon">
  </head>
  <!-- body定义文档主体，支持html全局和事件属性 -->
  <body>
  </body>
</html>
```

* 文本格式化标签: （语义强烈）

|   加粗  | 倾斜   | 删除线 | 下划线 |
| ------- | ----- | ------ | ------ |
|`<strong>`|`<em>`|`<del>` |`<ins>` |

* 目录
1.目录文件夹：普通
2.根目录：打开目录文件夹的第一层

* 路径
1.相对路径：图片相对于 html 页面的位置。
  同级     ./  （可省略）
  下一级    /
  上一级  ../
2.绝对路径：从盘符 D: 或 网络地址 http:// 开始

* 图片标签： `<img src="./images/logo.png" alt="" title="" width="30" />`
src必写：路径和文件名
alt：替换文本，图像无法显示时替换文字
title：提示文本，鼠标悬停显示的文字
width/height：图像宽高（一般只写一个）
border：图像边框粗细

* 超链接标签：`<a href="" target="目标窗口弹出方式"></a>`
href必写：目标的url地址
target：（默认）_self当前窗口打开，_blank在新窗口打开， _parent在父窗口中打开页面，_top在顶层窗口中打开文件
<!-- 标签用href，具有超链接功能。 -->

* 链接分类
外部链接： http://
内部链接： index.html
空链接：   #
下载链接： 地址是文件 .exe或.zip 压缩包，会下载这个文件
网页元素链接：文本、图片、音频、表格…
锚点链接： 点击链接可以快速定位到页面某个位置 (属性值设置成 #id名)
  `<a id="top"></a>`     // 锚点
  本页面：
  `<a href="#top"></a>`  // 跳到对应锚点
  页面间：
  `<a href="index.html#top"></a>`   // 跳到index页的指定位置

* href 和 src 区别
1.请求资源类型不同
  href 指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的联系。
  src是指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 src 资源时会将资源下载并应用到文档中，如JavaScript脚本，img图片。
2.作用结果不同
  href 用于在当前文档和引用资源之间确立联系。
  src 用于替换当前内容。
3.浏览器解析方式不同
  若在文档中添加`<link href="reset.css" rel="stylesheet"/>` ，浏览器会识别该文档为 CSS 文件，就会并行下载资源,并且不会停止对当前文档的处理。这也是为什么建议使用 link 方式加载 CSS，而不是使用 @import 方式。
  当浏览器解析到`<script src="script.js"></script>`时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等也如此，类似于将所指向资源应用到当前内容。这也是为什么建议把 js 脚本放在底部而不是头部的原因。

* 特殊字符
&nbsp; 空格
&lt;  小于号
&gt;  大于号
&amp; 和号&

* 表格标签
tr 定义行
th 定义表头单元格
td 定义单元格

```html
<table>  
  <tr>
    <th>表头a</th>
    <th>表头b</th>
  </tr>
  <tr>
    <td>行1列1</td>
    <td>行1列2</td>
  </tr>
  <tr>
    <td>行2列1</td>
    <td>行2列2</td>
  </tr>
</table>
```

* table属性：
align="center"           相对周围元素对齐方式，left/right
width="30%"              宽度，px或百分比
border="1"               是否有边框，默认""无
bordercolor="blue"       边框颜色
bgcolor="red"            背景颜色
background="img/1.jpg"   背景图片
cellpadding="10"         单元格内边距（与内容间空白），默认1px
cellspacing="10"         单元格之间的间距，默认2px
<!-- style="border-collapse:collapse;" 合并相邻边框 -->

* 单元格tr/td属性：
  rowspan                 跨行合并单元格
  colspan                 跨列合并单元格
  width/height            宽高
  bgcolor                 单元格背景色
  align                   单元格水平对齐
  vlign                   单元格垂直对齐

跨行合并 rowspan = "合并单元格的个数"  最上侧是目标单元格（写合并代码）
跨列合并 colspan = "合并单元格的个数"  最左侧是目标单元格（写合并代码）
`<td colspan="2"></td>` 删除多余的单元格（它之后的td）

* 表格结构标签
thead  表格头部区域
tbody  表格主体区域
tfoot  表格底部区域

```html
<table>
  <caption>表格标题</caption>
  <thead>
    <tr>   
        <th> 表头单元格1</th>   
        <th> 表头单元格2</th> 
    </tr>
  </thead> 

  <tbody>
    <tr>   
        <td>单元格1</td>   
        <td>单元格2</td> 
  </tr>
  </tbody>
  <tfoot>
    <tr>
      <td>底部1</td>
      <td>底部2</td>
    </tr>
  </tfoot>
</table>
```

* 列表标签（无序、有序、自定义）
ul内部只能包含li标签
dl只能包含dt/dd

```html
无序：
  type：圆形disc、空心圆circle、方形square
<ul>
   <li> </li> 
   <li> </li>
</ul>
有序：
<ol>
  <li> </li>
  <li> </li>
</ol>
自定义：
<dl>
  <dt>名词1 </dt>
     <dd> 解释1</dd>
     <dd> 解释2</dd> 
  <dt>名词2 </dt>
​     <dd> 解释1</dd>
     <dd> 解释2</dd> 
</dl>
```

* 表单标签(收集用户信息)
表单：表单域、表单控件（元素）、提示信息

* 表单域：提交区域内表单元素给后台服务器
`<form action="./demo.php" method="post" name="表单域名称"> 表单控件 </form>`

| 属性   | 值        |   含义                                   |
| ------ | -------- | ---------------------------------------- |
| action | url      |   接收、处理表单数据的服务器程序的 url地址  |
| method | get/post |     表单数据的提交方式，明文/隐式提交      |
| name   | 名称     |        区分同一页面中多个表单域            |

get：默认，用url传参数 http://服务器地址 ? name1=value1 & name2=value2
post：数据封装后用 http 传递
enctype：表单发送的编码方式，post时有效

* 表单控件（元素）：

1.input输入`<input type="属性值" name=" " value="请输入" />`
|type 值   |                                     |
| -------- | ----------------------------------- |
| button   | 可点击按钮，获取验证码（搭配js用）    |
| checkbox | 复选框，name相同，value不同          |
| file     | 输入字段和“浏览”按钮，上传文件        |
| hidden   | 隐藏的输入字段                       |
| image    | 图像形式的提交按钮                   |
| password | 密码字段，字符被掩码                 |
| radio    | 单选按钮，name相同，才能多选一        |
| reset    | 重置按钮，清除表单所有数据            |
| submit   | 提交按钮，表单数据发送服务器          |
| text     | 单行输入文本，默认宽度20字符          |

`<label>`为input元素定义标注，用于绑定表单元素。
当点击`<label>`内文本时，浏览器会自动将焦点（光标）转到/选择对应的表单元素上；增大了标签点击面积，方便用户。
`<label for = "nv">女</label>`
`<input type = "radio" name ="sex" id="nv" />`

其它常用属性：（name和value主要给后台使用）
name：元素的名称
value：元素的值，页面打开时默认显示内容
maxlength：输入字段中字符最大长度
checked="checked"：页面打开时默认选中，单选按钮和复选框可设置
disabled="disabled" 禁用(按钮不能点/输入框不能改/数据不能传后台)
hidden="hidden"   隐藏
placeholder  提示信息，当有value时被覆盖
tabindex    值1，控制按tab时的跳转顺序，获得焦点

2.select下拉
size="1" 下拉列表中 可见选项 的数目（小于选项总数会有滚动条）
selected 默认选中项
没value时，向后台传标签中的文字；有value时，传value值。

```html
<select name="列表名"> 
  <option selected="selected"> 请选择年</option>  
  <option value=""> </option>
</select>
```

3.textarea 文本域  `<textarea> 输入多行文字 </textarea>`
cols  文本区可见宽度
rows  可见行数
readonly="readonly";  只读
disabled="disabled";    禁用
overflow：hidden;  超出隐藏， scroll 显示滚动条，auto自动（根据字数）
resize: none;  不允许拖放修改宽高
vertical-aign: top;  外部的文字在左上角显示，默认左下
`<textarea cols="30" rows="5" style="resize: none;vertical-align: top;"></textarea>`
