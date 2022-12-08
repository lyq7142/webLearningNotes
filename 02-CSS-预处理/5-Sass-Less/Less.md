# Less 精简样式表

动态样式语言，css预处理器

* 注释
多行注释保留；单行注释不被保留在编译生成的CSS中。

## 变量

@声明变量，可以当作普通属性值用。

```less
@width: 100px;
@height: 50px;

div{
    width: @width;
    height: @height;
}
```

* 变量插值variable interpolation

变量用于选择器名、属性名、URL、@import语句

```less
@my-selector: banner;

.@ {my-selector} {
    margin:0 auto;
}

@property: color;
.box{
    @{property}: #fff ;
    background-@{property}: #000 ;
}

@images: '../img';
body{
    background-image: url('@{images}/1.png');
}

@themes: '../../src/themes';
@import '@{themes}/tidal-wave.less';
```

* 延迟加载lazy evaluation

当一个变量被声明多次，会取最后一次的值，并从当前作用域往外寻找变量

```less
@var: 0;
.class{
    @var: 1;
    .brass{
        @var: 2;
        three: @var;  
        @var: 3;
    }
    one: @var;
}
```

* 属性名变量properties as variable

在属性名前加$，可以直接作为变量使用

```less
.widget {
  color: #efefef;
  background-color: $color;
}
```

## 嵌套nesting

```less
/* 相当于 ul{}    ul li{}  */
ul{
    font-size: 20px;
    li{
        color: #fff;
    }
}
```

## 父选择器

& 表示父选择器，常用于给选择器添加伪类、生成重复类名

```less
/* 相当于 .box a{}   .box a:hover{} */
.box{
    a{
        color: #000; 
        &:hover{
            color: #e0e0e0;
        }
    }
}
/* 相当于 .button-ok{}  .button-cancel{}  */
.button{
    &-ok{...}
    &-cancel{...}
}
```

## 混合mixins

复制粘贴，将一组属性从一个规则集 混入到另一个规则集

* 普通混合

```less
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}

#menu a {
  color: #111;
  .bordered();      /*把bordered里的属性加进来*/
}
```

* 带参数的混合

```less
.border (@width, @style, @color) {
  border: @width @style @color;
}
div {
  .border(1px, solid, red);   /*border: 1px solid red;*/
}
/* 带有默认值，也要按顺序传参 */
.border (@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(1px, solid);
}
/* 指定参数名称就不用顺序传参 */
.border (@width, @style, @color: #ccc) {
  border: @width @style @color;
}
div {
  .border(@style: solid, @color: red, @width: 100px);
}
```

* @arguments变量
包含传入的所有参数

```less
.box-shadow (@x: 0, @y: 0, @blur: 1px, @color: #000) {
  -webkit-box-shadow: @arguments;   // 2px 5px 1px #000;
  -moz-box-shadow: @arguments;
  box-shadow: @arguments;
}
.big-block {
  .box-shadow(2px, 5px);
}
```

* 匹配模式pattern-matching
在多个相同的混合中（参数个数相同），匹配特定的混合
@_  匹配所有

## 运算operations

计算结果以操作数最左侧的单位类型为准

```less
@conversion-1: 5cm + 10mm; // 6cm
@conversion-2: 2 - 3cm - 5mm; // -1.5cm
@conversion-3: 3.1 * 2cm; // 6.2cm
@conversion-4: 4px / 2; // 4px / 2

@incompatible-units: 1cm - 1px; // 0.97354167cm

@base: 5%;
@filler: @base * 2; // 10%
@other: @base + @filler; // 15%

@color: #224488 / 2; // #112244
background-color: #112244 + #111; // #223355
```

## 继承extend

让多个选择器应用同一组属性，最终编译为并集选择器；性能比混合高，不灵活

```less
nav ul {
  &:extend(.inline);     //nav ul{color:red;}
  background: blue;
}
.inline {
  color: red;
}
// extend "all"   把.test出现的地方全部新增一份，名为replacement
.a.b.test,
.test.c {
  color: orange;
}
.test {
  &:hover {
    color: green;
  }
}

.replacement:extend(.test all) {
}
/* 相当于
.a.b.test,
.test.c,
.a.b.replacement,
.replacement.c {
  color: orange;
}
.test:hover,
.replacement:hover {
  color: green;
}
*/ 
```

## 避免编译

加''避免less编译，直接把内容输出到CSS中

```less
.banner .inline .header {
  width: '100px + 100px';    //100px+100px
  height: 100px + 100px;     //200px
}
```
