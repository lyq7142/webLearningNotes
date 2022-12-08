# require和import区别

CommonJS实现了js的模块化规范，规范了模块特性和各模块间的相互依赖性。
代码更好编写和维护，提高了代码的复用性。
定义每个文件都是一个模块（module变量->当前模块），并有自己的作用，每个文件内定义的变量、函数、类都私有，对其它模块不可见。
模块的exports属性是对外的接口，提供exports导出的属性才能被加载识别。
Node是基于CommonJS实现的，因为它规范加载模块是同步的，服务器中node模块都直接存储在服务器本地硬盘，加载比较快。

import是ES6中的语法标准，用来加载模块文件，import函数读取并执行一个js文件，返回该模块的export命令指定输出的代码。
export与export default均可用于导出常量、函数、文件、模块，export可以有多个，export default只能有一个。

* 区别
1，require是CommonJS规范的模块化语法，import是ECMAScript 6规范的模块化语法；
2，require是运行时加载，import是编译时加载；
3，require可以写在代码的任意位置，import只能写在文件的最顶端且不可在条件语句或函数作用域中使用；
4，require通过module.exports导出的值就不能再变化，import通过export导出的值可以改变；
5；require通过module.exports导出的是exports对象，import通过export导出是指定输出的代码；
6，require运行时才引入模块的属性所以性能相对较低，import编译时引入模块的属性所所以性能稍高。

* require
定义模块：exports导出系统会帮转成module.exports，只是导出需要导出名
module.exports={   // 或 exports.data={}
    url:'www.baidu.com',
    name:'lyq'
}
加载模块：require加载模块文件，如果参数以/开头是绝对路径，以./开头是相对路径
var app = require('./test.js')

* import
定义模块：export关键字从模块中导出变量、对象、函数、类，一个模块只有一个export default
export var width = 5;
export function add(){}
export default{
    url = 'www.baidu.com';
}
加载模块：可以以整个模块的内容、单个多个接口、带别名的接口、默认值方式载入->按需加载，提高性能
import default from './test.js'   //模块有export语法才生效
import {width} from './test.js'
import * as data from './test.js'  //导出所有导出接口
