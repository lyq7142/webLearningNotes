# 浏览器兼容

浏览器内核：渲染引擎、js引擎

## css兼容

标签默认margin和padding不同
//解决：*{margin:0;padding:0;} 性能不好；引入reset.css
c3新特性不兼容(@keyframes  transform  transition animation border-radius box-shadow flex布局)
//加浏览器前缀   -moz-   -webkit-  -o-  -ms-
设置为float的div在ie下设置的margin会加倍
//在div里加display:inline;
设置div高度小于10px，IE6、7和遨游里div的高度超出
//overflow:hidden; 或 设置line-height<高度
行内转块级后，用float布局，有margin，IE6间距比大
//display:inline;display:table
被访问过的链接样式没有hover和active
//css属性顺序lvha
图片默认有间距
//float属性
css hack解决浏览器兼容性
`background-color:yellow0;`   0 留给ie8的
`+background-color:pink;`     + ie7定了；
`_background-color:orange;`   _专门留给ie6；

### css hack

针对不同浏览器写不同的css，主要针对IE浏览器
常见形式：属性hack、选择符hack、条件注释hack

```css
/* 属性hack */
.test{ 
    color:#090\09; /* For IE8+、FF */ 
    *color:#f00;   /* For IE7 */ 
    _color:#ff0;   /* For IE6 */ 
}
/* 选择符hack */
*html .test{color:#090;} /* For IE6 and earlier */
*+html .test{color:#ff0;} /* For IE7 */
.test{color:#f00;}        /* For IE8+ and not IE */
/* 条件注释（只有IE执行此代码） */
<!--[if IE]>
  html/css/js
<![endif]-->

浏览器优先级：
FF < IE7 < IE6,CSS hack

#demo {width:100px;} /*被FIREFOX,IE6,IE7执行.*/
* html #demo {width:120px;} /*会被IE6执行,之前的定义会被后来的覆盖,所以#demo的宽度在IE6就为120px; */
*+html #demo {width:130px;} /*会被IE7执行*/
所以最后,#demo的宽度在三个浏览器的解释为: FIREFOX:100px; ie6:120px; ie7:130px;

IE8+ 最新属性css hack：
"9"　例:"border:1px 9;"这里的"9"可以区别所有IE和FireFox.（只针对IE9 Hack）
"0"　IE8识别，IE6、IE7不能.
"*"　IE6、IE7可以识别.IE8、FireFox不能.
"_"　IE6可以识别"_",IE7、IE8、FireFox不能.

```
