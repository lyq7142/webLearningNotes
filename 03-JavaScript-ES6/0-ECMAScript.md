# ECMAScript

* 三大核心组成部分   JavaScript = ECMAScript + Bom + Dom
ECMAScript：JS的书写语法和书写规则
BOM(Browser Object Model)浏览器对象模型：JS操作浏览器发生变化的属性和方法
DOM(Document Object Model)文档对象模型：JS操作文档流发生变化的属性和方法

## 1. 基本语法

### 1）JS书写位置

```js
//行内式：直接把代码写在标签上。
<a href="JavaScript:alert('hello');"></a>
<div onclick="alert('hello')"></div>
//内嵌式：书写在script标签对内。
<script> alert('hello'); </script>   
//外链式：把代码写在一个.js文件中。(推荐)
<script src="./index.js"></script>
```

### 2）注释

// 单行注释
/*
 多行注释
*/

### 3）数据类型

* 基本数据类型（值类型）：
Number: 数值。 整数/小数/NaN(一个不是数字的数值类型)，0x十六进制，0o八进制，0b二进制。
String: 字符串。 "a"  "abc"  'abc' "123"  不区分单双引号
Boolean: true/false
Null: 有值，有一个空值，对象为空的占位符。
Undefined: 未定义，表示没有值。 变量没给初值时默认undefined
Symbol：独一无二的值（ES6新增）
Bigint：（ES10新增）
* 引用数据类型：
对象 Object   （特殊对象：正则RegExp、日期Date）
数组 Array
函数 Function

#### js数据类型判断

* typeof检测变量的基本数据类型   //typeof检测引用类型都返回object，null属于特殊引用类型，function属于特殊引用类型不用于存储数据
语法：typeof 变量名
typeof {}             //object
typeof [1,2,3]        //object
typeof null           //object
typeof function(){}   //function

* instanceof检测复杂数据类型
指定一个特定类型，判断这个构造函数的原型是否在给定对象的原型链上。
null instanceof Object   //false
undefined instanceof Object   //false
因为null和undefined的类型就是自己本身，不是object创建出来的。
// 基本类型中：number string boolean。字面量值不能用instanceof检测，但构造函数创建的值可以。

* constructor //prototype上的属性，指向构造函数，不能判断null和undefined
变量.constructor==类型
* object.prototype.toString.call()
* jquery.type() === "类型"

* 栈堆存储
值类型栈存储：number boolean string 占据空间小，大小固定，频繁被使用，在栈中从上往下存储。
引用类型堆栈存储：object array null同时存在堆和栈中，占据空间大、大小不固定。引用类型在栈中存储指针，指向该实体的起始地址，堆内存从下往上存储

### 4）变量

变量：一小块存储数据的内存空间。
变量命名：包含数字、字母、美元符$、下划线_ ，数字不能开头，严格区分大小写。
JS是弱类型语言（开辟存储空间时，不定义数据类型，可以存放任意类型的数据）

```javaScript
//1.定义number类型
var num = 1;
var num2 = 1.2;
var num3 = NaN;

//2.定义string类型，单/双引号
var str = "abc";
var str2 = 'def';

//3.定义boolean
var flag = true;    // true

//4.定义null
var obj = null;      // null 表示一个空
var obj2 = undefined;   // undefined 声明一个没有赋值的变量
var obj3;               // undefined
```

* 隐式转换：如果运算数不是运算符所要求的类型,那么js引擎会自动将运算数进行类型转换。

* 数据类型转换：
转数值：
    Number(要转换的内容)  '123'---123 , 'ab'---NaN , null---0 , undefined---NaN  // 有一个不是数字就NaN
    parseInt(要转换的内容) '123'---123 , 'abc12'---NaN , '123abc'---123 ,null---NaN , undefined---NaN   // 第一位是数字，就会一位位解析直到遇见非数字结束
    parseFloat(要转换的内容)   '123.4ab'---'123.4'   '12.34.56'---'12.34'  '123ab'---'123' // 会解析第一个小数点，遇到第二个点或非数字结束。如果只有整数，解析为整数
转字符串：
    string(要转换的内容)     true---'true' 'null'---'null'
    要转换的内容.toString()   true---'true'    // 不能转null和undefined
    +的特性    // +的任意一边是字符串，进行字符串拼接
转布尔：
    Boolean(要转换的内容)   0 NaN '' undefined null ==> false  // 其它所有内容都转换为true，eg: []   ' '   '0'

### 5）运算符

```javaScript
//1.一元运算符
++，--，+(正号) -(负号)  

++i   先自增，再运算。
i++   先运算，再自增。  

// 其它类型转number：
//     string转number：按照字面值转换。如果字面值不是数字，则转为NaN
//     boolean转number：true转为1，false转为0

var a = +"123"; 
alert(typeof(a));  // number
alert(a + 1);      // 输出124

var b = +"abc"; 
alert(typeof(b));  // number
alert(b + 1);      // 输出NaN

var flag = +true; 
alert(typeof(flag));  // number
alert(flag);          // 输出1

//2.算数运算符

+：符号两边都是数字或布尔时，进行数学运算；任意一边是字符串时，进行字符串拼接。
- * / % 进行数学运算。

var a=3;
var b=4;
document.write(a/b);   //输出0.75，保留小数部分

//3.赋值运算符
=  +=  -+  *=   /=  %=

//4.比较运算符
大于  小于  >=  <= 
==（等于）   ===（全等于） 
!=（不等于）  !==（不全等于）

// 全等 比较值和类型，等于 只是比较值 ，因为js是弱类型语言，变量数据类型会自动转换
==：比较 值 是否相等，不考虑数据类型。"123" == 123,0=='',0==false,null==undefined  // true
===：必须 值 和 数据类型 都相等，才为true。"123" === 123  // false
!=：只考虑 值 是否不相等。
!==：只要 值 或者 数据类型 任何一个不相等，为true.

比较方式：
    1.类型相同：直接比较
        字符串：按照字典顺序按位逐一比较 "abc" < "acb"
    2.类型不同：先进行类型转换，再比较

//5.逻辑运算符 
&&   ||   !  
//6.三元运算符
? :
```

### 6）流程控制语句

* 条件分支语句
if () {...} else if () {...} else {...}

switch(已知条件){
    case 选项1:
    ...
    break;
    ...
    default:
    ...
}

* 循环结构语句

var n=0;
while(n<3){
    代码
    n++;
}

do {
    代码
}while(条件)

for(var i=0;i<3;i++){
    代码
}
continue、break：终止本次循环、跳出循环

## 2.基本对象

### Array 数组 数据类型

特点：有序的 数据 的集合，数组元素类型可变，数组长度可变，索引从0开始依次+1
操作：
    获取长度：  arr.length
    设置长度：  arr.length=10;
    获取数据：  arr[2]
    设置数据：  arr[3]=1234;

```javascript
// 创建（声明构造函数方式、字面量方式）
var arr1 = new Array(1,2,3);  
var arr2 = new Array(5); //默认长度5。输出,,,,
var arr3 = [1,2,3,4];
var arr = [1,"abc",true];
// 增删
arr.push(11);
document.write(arr.join()); // 1，abc，true，11
arr.pop();
// 多维数组
var a1 = [1,2,'A','B'];
var a2 = [1,2,a1,'A','B'];

// 遍历
var arr = [10,20,30,40,50];
for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
}
// 冒泡排序
for(var j=0;j<arr.length-1;j++){
    for(var i=0;i<arr.length-1-j;i++):
    if(arr[i]>arr[i+1]){
        var temp=arr[i];
        arr[i]=arr[i+1];
        arr[i+1]=temp;
    }
}
```

### 对象数据类型 object

变量都是对象，对象是变量的容器，是属性和方法的容器。

* 创建 对象(键值对的集合)
    var obj={
        name: 'lyq',
        age: 18 ,
        fullName:function(){}  // 值是函数则成为方法，其它类型的值都是属性
    };
* 对象的操作（增删改查）--对键值对的操作
   var obj1 = { };
   *增加：
   obj1.name = 'lyq';  
   obj1['age'] = 18;
   *删除：
   delete obj1.name;
   delete obj1['age'];
   *修改：
   和 增加 的语法一样
   *查看：
   console.log(obj1.name);
   console.log(obj1['age']);
   obj1.fullName();  //使用对象方法

#### 对象的遍历

for(let key in obj){
    console.log(key +'---'+ obj[key])  // name---lyq age---18
}
Object.keys(obj)     // ['name','age',...]
Object.Values(obj)   // ['lyq','18',...]
Object.getOwnPropertyNames(obj)

### Function 函数（方法）对象

特点：
​    方法定义时，形参类型不用写,返回值类型也不写
​    方法是一个对象，如果方法名称相同，会覆盖前面的
​    方法的调用只与方法的名称有关，和参数列表无关
​    在方法声明中有一个隐藏的内置对象（数组）arguments，封装所有的实际参数
    声明后，里面代码不会执行，除非函数被调用

```javaScript
// 关键字声明
function fun1(a,b){  // 形参只能在函数内部使用，值由函数调用时的实参决定
    console.log(a+b);
}
fun1(3,4);   //函数调用，实参（给形参从左到右依次赋值）
fun1(5,6);

// 表达式声明
var fun2=function(a,b){
    console.log(a+b);
}
fun2(3,4);
// 返回值
var fun3=function(a,b){
    console.log(a+b);
    return ;   //没有返回值，返回undefined
}
var f = fun3(3,4);

匿名函数
var fun = function(){
}
或
(function(){  // 把函数作为整体括起来

})()  // 尾括号用来调用

// 求任意个数的和
function add(){
    var sum = 0;
    for(var i = 0;i < arguments.length;i++){
        sum += arguments[i];
    }
    return sum;
}
var sum=add(1,2,3,4);
alert(sum);    //10

// 递归函数
function fn(n){
    if(n===1) return 1;
    return n * fn(n-1);
}
```

* 利用apply求数组最大值

```js
const arr = [1,2,3,4,66,8,9];
const maxNum = Math.max.apply(null, arr);
console.log(maxNum);
```

apply是调用函数的方法，参数为 apply(function,args)
function为null时，默认为上文
Math.max.apply(null, arr) 即 apply(Math.max,arr)

当使用apply时，把所有参数加入到一个数组中，即
arr =  [a, b, c, d, ...]
即Math.max.apply(null, [a, b, c, d, ...])
等同于
Math.max(a, b, c, d, ...)

### 作用域 & 自由变量

作用域：一个变量可以使用的范围。
不用var声明的变量就是全局变量
全局变量是window对象，所有数据变量属于window对象。

* 种类：
全局作用域：js有最外层的作用域  a=1;
函数作用域：可以嵌套
块级作用域（ES6新增）：大括号{}，只适用于let和const

* 自由变量：当前作用域没有定义的变量
变量在当前作用域没定义，却被使用了，向上级作用域，一层一层查找，如果到全局作用域都没找到，则报错。(=>作用域链)

#### 变量提升（预解析）

var声明的变量 或 function声明的函数 存在变量提升。  // let const不会变量提升

```js
console.log( a );
var a = 2;
console.log( a );
// 等价于
var a;     //声明被提前
console.log( a );   // undefined
a = 2;
console.log( a );   //2
// 函数声明被提升，所以正常打印jack
fn('jack')；//jack
function fn (name){
console.log(name)
}
// 函数表达式不行，var fn被提升，但函数没提升
fn("jack");//报错
var fn = function(name) {
console.log(name);
};

```

* 函数优先：（有多个“重复”声明的代码中）是函数会首先被提升，然后才是变量。

```js
foo(); // 1
var foo;
function foo() {
    console.log( 1 );
}
foo = function() {
    console.log( 2 );
};
```

var foo 尽管出现在 function foo() 的声明之前，但它是重复声明的（被忽略掉了），函数声明会被提升到普通变量之前。
尽管重复的 var 声明会被忽略掉，但出现在后面的函数声明2还是可以覆盖前面1的。

* js代码运行阶段：
1.解析编译：语法检查，变量及函数声明
2.运行：变量赋值，代码流程执行，从上往下

### this的指向

* 1.普通函数中的this
function fn(){
    console.log(this)
}
fn();   //相当于window.fn()   window调用了fn，所以this指向window

* 2.对象方法中的this
var obj={
    name: 'lyq',
    age: 18 ,
    run:function(){
        console.log(this.name)
    }
};
obj.run();   //obj调用的run方法，所以this指向obj

* 3.call/apply/bind()改变this的指向，指向被传入的对象

```js
let obj={
    name:'小明'
}
let pox={
    name:'小红',
    run:function(){
        console.log(this.name)
    }
} 
// 对象方法中的this.指向方法的调用者
pox.run();// pox 小红
pox.run.call(obj)// 小明
pox.run.apply(obj);// 小明
pox.run.bind(obj)();//小明    bind要手动执行
```

* 4.类中的this指向new后的实例对象

* 5.箭头函数的this指向父级上下文对象，并不可被call/apply/bind修改

```js
let obj={
    name:'小明'
}
var name='杨志' //不能用let声明，不存在变量提升
let pox={
    name:'小红',
    run:()=>{
        console.log(this.name)//this
    }
} 
pox.run();// 杨志
pox.run.call(obj)// 杨志
pox.run.ally(obj);// 杨志
pox.run.bind(obj)();//杨志
```

* 6.特殊
setTimeout函数中的this,相当于普通函数中的this,因为setTimeout触发的函数执行，并不是外部对象执行的。
setTimeout中函数是箭头函数，this为当前对象。因为箭头函数中的this始终是父级上下文中的this

### 手写bind

```js
// 模拟 bind
Function.prototype.bind1 = function () {
    // 将参数拆解为数组
    const args = Array.prototype.slice.call(arguments)
    // 获取 this（数组第一项）
    const t = args.shift()
    // fn1.bind(...) 中的 fn1
    const self = this
    // 返回一个函数
    return function () {
        return self.apply(t, args)
    }
}
function fn1(a, b, c) {
    console.log('this', this)
    console.log(a, b, c)
    return 'this is fn1'
}
const fn2 = fn1.bind1({x: 100}, 10, 20, 30)
const res = fn2()
console.log(res)
```

### 数组常用方法

1.push() // arr.push(12)，将数据12追加到数组的末尾，返回追加后数组最新的长度
2.pop()  //arr.pop()，删除数组最后一个数据，返回被删除的数据
3.unshift() //arr.unshift(11)，将数据11添加到数组最前面，返回数组最新的长度
4.shift()  //arr.shift()，删除数组最前一个数据，返回被删除的数据
5.reverse() //arr.reverse()，反转数组，返回反转后的数组
6.splice()  //arr.splice(开始索引，多少个，要插入的数据)，默认（0，0，无），删除数组中若干数据，并选择是否插入新的数据，以新数组的形式返回被删除的数据
7.slice()  //arr.slice(开始索引，结束索引)，默认（0，数组长度），截取数组中的某些数据，以新数组形式返回内容，包前不包后
8.sort()   //arr.sort()，排序
    //arr.sort( function(a,b) {return a-b} )  升序排列
    //arr.sort( function(a,b) {return b-a} )  降序排列
9.join()  //arr.join('-')，将数组用连接符连接为字符串，返回连接好的字符串
10.concat() //arr.concat(500，600，700)，将其它数组与数组拼接在一起，返回拼接好的新数组
11.indexOf()  //arr.indexOf(数据)，查找数据在数组中第一次出现的索引位置，或-1（没有该数据）
12.forEach()  遍历数组，无返回值
    //arr.forEach( function(item, index, arr){ } )
                         //每一项 索引 原始数组
13.map()   映射数组，返回映射后的新数组
    //arr.map( function(item,index,arr){ return方法书写映射条件 } )
14.filter()  过滤数组
    //arr.filter( function(item,index,arr){ return方法书写过滤条件 } )
15.every()  判断数组是不是每一项都满足条件，返回布尔值
    //arr.every( function(item,index,arr){ return方法书写条件 } )
16.some()  判断数组中是否有某一项满足条件，返回布尔值
    //arr.some( function(item,index,arr){ return方法书写条件 } )

### 字符串常用方法

1.charAt()  //str.charAt(索引)，获取对应索引位置的字符并返回
2.toLowerCase()  //str.toLowerCase()，将字符串内的字母全部转换成小写，返回转换好的字符串
3.toUpperCase()  //str.toUpperCase()，将字符串内的字母全部转换成大写，返回转换好的字符串
4.replace() //str.replace(换下内容，换上内容)，将字符串内 第一个 满足换下内容的片段替换成换上内容，返回替换好的字符串
5.trim()  //str.trim()，去除字符串首尾的空格，返回去除后的字符串
6.split() //str.split(分隔符)，按分隔符将字符串切割成一个数组，返回切割后的数组
7.substr()    //截取字符串并返回，（开始索引，多少个）
8.substring() //截取字符串并返回，（开始索引，结束索引）
9.slice()     //截取字符串并返回，（开始索引，结束索引）
10.indexOf()  //查找字符第一次出现的位置

### Math 数学常用方法

1.​random()  //Math.random()，返回0~1之间的随机小数[0,1)
​2.round() //Math.round(10.4)，把数字四舍五入为最接近的整数10
​3.ceil() //Math.cell(10.5)，对数进行向上取整11
​4.floor() //Math.floor(10.5)，对数进行向下取整10
5.pow()  //Math.pow(底数2，指数5)，对数字进行取幂^运算，返回结果32
6.sqrt() //Math.sqrt(4)，对数字进行二次方根运算，返回结果2
7.abs() //Math.abs(-5)，对数字进行绝对值运算，返回结果5
8.max() //Math.max(2,4,1,5,3)，获取若干数字中的最大值并返回5
9.min() //Math.min(2,4,1,5,3)，获取若干数字中的最小值并返回1
10.PI  //Math.PI  ，获取一个近似Π的值

```javascript
//获取1-100之间的随机整数
var num = Math.floor((Math.random()*100)) + 1;
// 获取范围内的随机整数
function randomNum(min,max){
    var res=Math.floor(Math.random()*(max-min+1));
    var res2=res+min;
    return res2;
}
var res = randomNum(10,20);
```

### Date 时间常用方法

获取：
1.时间对象.getFullYear() //获取年份信息
2.时间对象.getMonth()+1   //获取月份信息，月份数组从0开始，0-11月
3.时间对象.getDate()     //获取日期信息
4.时间对象.getHours()    //获取小时信息
5.时间对象.getMinutes()  //获取分钟信息
6.时间对象.getSeconds()  //获取秒钟信息
7.时间对象.getDay()      //获取星期信息
8.时间对象.getTime()     //获取时间戳信息，从格林威治时间1970年1月1日0点0分0秒 到 时间对象节点 的毫秒差值

设置：把获取方法的get换成set，都要设置参数。没有设置星期信息的方法。

```javascript
var date = new Date(); //中国标准时间
var date2 = Date.now();  //毫秒
var date3 = new Date(2022,7,25,17,5,18); //2022年7月25日17点5分18秒，（月份是0-11月）
// ​tolocaleString() 返回当前时间对象对应的时间本地字符串格式
```

### Global

特点：全局对象，封装的方法不需要对象就可以直接调用。
方法：
​    encodeURI(): url编码
​    decodeURI(): url解码
​    encodeURIComponent(): url编码，编码的字符更多
​    decodeURIComponent(): url解码
​    parseInt(): 将字符串转为数字，逐一判断每一个字符是否是数字，直到不是数字为止
​    isNaN(): 判断一个值是否是NaN    // NaN参与==比较 全部为false
​    eval():  将js字符串作为脚本来执行。

```js
//URL编码
var str = "传智播客";
var encode = encodeURI(str);
document.write(encode);  // %E4%BC%A0%E6......
var s = decodeURI(encode);  //服务器端把码转成汉字

var str = "123";
var number = parseInt(str);
alert(number + 1);   // 124
var str = "123abc";
var number = parseInt(str);
alert(number + 1);   //124 
var str = "a123";
var number = parseInt(str);
alert(number + 1);   //NaN

var a = NaN;
document.write(a==NaN);  //false
document.write(isNaN(a)); //true

var jscode = "alert(123)";
eval(jscode);
```
