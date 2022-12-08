# css预处理语言

开发时用预处理语言，打包上线时，用webpack配合loader工具转成css给浏览器使用。
主流css预处理器：Less  Sass(Scss)  Stylus

* Sass/Scss
Sass (Syntactically Awesome Stylesheets)是一种动态样式语言，Sass语法属于缩排语法，比css比多出很多功能(如变量、嵌套、运算、混入(Mixin)、继承、颜色处理、函数等)，更容易阅读。
由于不能将css代码加到Sass里，所以语法进行了改良，Sass3就变成了Scss(sassy css)，与原来的语法兼容，只是用{}取代原来的缩进。sass没有{} 和 ; 有严格的 缩进规范（与css一致）。
Sass版本3.0之前后缀是.sass，3.0之后后缀是.scss。

* Less
Less也是一种动态样式语言。对CSS赋予了动态语言的特性，如变量，继承，运算， 函数。
Less 既可以在客户端上运行 (支持IE 6+, Webkit, Firefox)，也可在服务端运行 (借助 Node.js)。优点：简单，兼容css。

* 区别
1.编译环境不同(Sass安装要ruby环境，在服务端处理)（Less要引入less.js处理代码输出css到浏览器，或者开发时使用Less，编译成css放入项目）
2.变量符不同（Sass是$）(Less是@)
3.变量作用域不同（Sass作用域，后声明的同名变量会覆盖之前的变量，不分局部全局）（Less作用域，块级，是从内往外找）
4.输出设置不同（Sass提供四种输出选项：nested(默认) compact compressed expanded）（Less没有输出设置）
5.支持语句不同（Sass支持条件语句，if else, for）(Less不支持)
6.引用外部CSS文件（Scss引用文件命名必须_开头，就不会编译为css文件）（Less引用文件跟css中的@import差不多）
7.工具库不同（Sass工具库：Compass，封装一些模板，强化功能）（Less组件库：Bootstrap）
