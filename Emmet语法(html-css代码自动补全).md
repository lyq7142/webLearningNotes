# Emmet语法

1. 后代 >

   nav>ul>li

   ```html
   <nav>
       <ul>
           <li></li>
       </ul>
   </nav>
   ```

2. 兄弟 +

   div+p+i

   ```html
      <div></div>
      <p></p>
      <i></i>
   ```

3. 上级 ^ （这里的^是在li后面，所以在li的上一级，与ul成为兄弟关系，两个就是上上级）

   div>ul>li^a

   ```html
       <div>
           <ul>
             <li></li>
           </ul> 
           <a></a>
       </div>
   ```

4. 分组 ()

   div>(ul>li>a)+div>p

   ```html
   <div>
       <ul>
           <li><a href=""></a></li>
       </ul>
       <div>
           <p></p>
       </div>
   </div>
   ```

5. 重复 *

   div*3

   ```html
     <div></div>
     <div></div>
     <div></div>
   ```

6. 自增 $

   ul>li.item$*5

   ```html
   <ul>
       <li class="item1"></li>
       <li class="item2"></li>
       <li class="item3"></li>
       <li class="item4"></li>
       <li class="item5"></li>
   </ul>
     ul>li.item$@-*5
   <ul>
        <li class="item5"></li>
        <li class="item4"></li>
        <li class="item3"></li>
        <li class="item2"></li>
        <li class="item1"></li>
   </ul>
   ul>li.item$@3*5
    <ul>
        <li class="item3"></li>
        <li class="item4"></li>
        <li class="item5"></li>
        <li class="item6"></li>
        <li class="item7"></li>
    </ul>

   ```

7. ID和类

   #header
   `<div id="header"></div>`

   .title
   `<div class="title"></div>`

   form#search.wide
   `<form action="" id="search" class="wide"></form>`

   p.class1.class2
   `<p class="class1 class2"></p>`

8. 自定义  []  

   p[title="hello"]
   `<p title="hello"></p>`

   td[rowspan=2 colspan=3 title]
   `<td rowspan="2" colspan="3" title=""></td>`

9. 文本 {}

   a{click me}
   `<a href="">click me</a>`

10. 隐式标签
    .
    `<div class=""></div>`

    ul>.
    `<ul><li class=""></li></ul>`

11. 其它标签
    未知缩写都会转换成标签<>

    !

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>  
    </body>
    </html>
    ```

    a
    `<a href=""></a>`

    link:css
    `<link rel="stylesheet" href="style.css">`

    meta:vp
    `<meta name="viewport" content="width=device-width, initial-scale=1.0">`

    form:get
    `<form action="" method="get"></form>`

12. css简写

    pos
    `position: relative;`

    t
    `top:;`

    w100
    `width: 100px;`

    tdn
    `text-decoration: none;`

13. 快速格式化 shift+alt+F
