# Sass

要编译为.css文件
控制台输入 sass input.scss  output.css
link引入css文件即可
自动转换 sass --watch input.scss:ouput.css   （后面可以写成文件夹形式 监视变化）

输出样式风格：
nested：嵌套缩进的css代码（默认）
expanded：展开的多行css代码
compact：简洁格式的css代码
compressed：压缩后的css代码

## 变量

```scss
$col: #fff;
h1{
    color: $col;  // 相当于color: #fff;
}
```

作为字符串：#{$name}
作为属性值：$name

## 嵌套

```scss
// 相当于 div{} div ul{} div ul li{} div ul li:hover{}
div{
    height: 100px;
    ul{
        height: 80px;
        li{
            height: 50px;
            &:hover{
                color: red;
            }
        }
    }
}
// 相当于 div{height;font-family;font-size;...border;border-left;...}
div{
    height: 100px;
    font: {
        family: 'fangsong';
        size: 20px;
        weight: 700;
    }
    border: 1px solid red {
       left: 0;
       top: 0;
    }
}
```

## mixin混合

```scss
// 相当于 div{color;} div a{font-size;}
@mixin name{
    color: red;
    a{
        font-size: 12px;
    }
}
div{
    @include name;
}
// 带参数
@mixin name($one,$two){
    color: $one;
    a{
        color: $one;
        font-size: $two;
    }
}
div{
    @include name(red,12px);
    // @include name($one:red,$two:12px); 指定参数名，参数位置可变
}
```

## 继承/扩展

@entend name     // 与name相关的都被继承

```scss
// 相当于 .one,.two{color;} .one a,.two a{font-size;}
.one{
    color: #000;
}
.one a{
    font-size: 10px;
}
.two{
    @extend .one;
}
```

## @import

引入一个.scss文件作为自己的一部分，该文件不会转换成.css格式。
所以命名要以下划线开头：_base.scss，引入时不用写下划线

```scss
@import: 'base.scss';
```

## 计算

```scss
$chang: 20px;
body{   
    margin: (10px*2);  //20px
    left: 20px + $chang;   //40px
} 
```

## 颜色函数

```scss
body{
    background-color: hsl(5,20%,20%);  // (色相，饱和度，明度)，相当于#3d2b29
    background-color: hsl(5,20%,20%,0.5);  // (色相，饱和度，明度，不透明度)，相当于（61，43，41，0.5）
    background-color: adjust-hue(hsl(0,100,50%), 100deg); //调整色相 adjust-hue(颜色，调整的度数)，相当于#55ff00
    background-color: lighten(rgb(228, 145, 145),50%);  //lighten让颜色更亮（颜色，增加亮度的百分比）
    color: darken(rgb(228, 145, 145),50%);
    // 调整颜色纯度 saturate让颜色更纯 ，desaturate让颜色不纯 saturate（颜色，百分比）
}
```

## interpolation插值

```scss
$col: color;
body{
    #{$col}: red;    //相当于color: red;    #{变量}
}
```

## if判断

```scss
$jia: false;
body{   
   @if $jia{
       color: red;
   }
   @if 2>3 {
       background-color: white;
   }@else{
       background-color: black;
   }
}  
```

## for循环

```scss
@for $i from 1 to 3 {    //to：结束值不执行 <  ,through：结束值执行 <=
    .div#{$i}{     // .div1{height:20px;}  .div2{40px}
       height: $i*20px;
    }
}
```

## 列表循环

```scss
$yanse: red blue black;  //列表
@each $i in $yanse { 
    .div#{$i}{   //.divred{} .divblue{} .divblack{}
      color: $i;
    }
}
```

## while循环

```scss
$gao: 1;
@while $gao<4 {
    .div#{$gao}{   //.div1{10px}  .div2{20px}  .div3{30px}
        height: $gao*10px;
    }
   $gao : $gao+1;
}
```

## function自定义函数

```scss
@function ziji ($bian)
{
    @return $bian+10px;
}

div{
    width: ziji(5px);     //15px
}
```
