# Node.js

## 简介

Node.js是一个基于chrome V8引擎的**JavaScript运行环境**。
使用事件驱动、非阻塞、异步I/O模型来提高性能，优化程序的传输量和规模。

chrome浏览器运行环境：V8引擎、内置API(DOM BOM Canvas XMLHttpRequest 内置对象)
Node.js运行环境：V8引擎、内置API(fs path http querystring js内置对象)

浏览器是JavaScript的前端运行环境；Nodej.js是JavaScript的后端运行环境。
Node.js中无法调用DOM\BOM等浏览器内置API。

* 在Node.js环境中执行js代码：
    终端：node index.js //切换到文件所在目录  nodemon自动重启

## fs 文件系统模块

node通过fs模块与文件系统交互、操作文件，该模块提供一些标准文件访问API来打开、读取、写入文件、交互。
导入fs模块：const fs = require('fs')

* 同步、异步调用

fs模块中所有操作都可选择两种形式：同步、异步。
同步文件系统：会阻塞程序执行，除非操作完毕，否则不会向下执行代码。
异步文件系统：不会阻塞程序执行，在操作完成时，通过回调函数返回结果。
    fs.close(fd,callback)   //带有callback的方法是异步
    fs.closeSync(fd)        //带有Sync的是同步

回调函数两个参数：err 错误结果、dataStr 成功结果。

* 简单文件读取：
fs.readFile(file[,options],callback)   //options默认utf-8
<!-- 如果文件读取成功，err值为null; 如果读取失败，err值为错误对象，dataStr值为undefined -->
* 简单文件写入：
fs.writeFile(file,data[,options],callback)  //data要写入的数据
<!-- 如果文件写入成功，err值为null；如果写入失败，err值为错误对象 -->

* 路径动态拼接问题
相对路径容易出现路径动态拼接错误问题  
//代码运行时，会以执行node命令时所处的目录，动态拼接出被操作文件的完整路径。
解决：
    写成绝对路径。反斜杠要写成两个，或者改成斜杠。C:\\Users\\.....    --->移植性差，不利于维护
    path.join(__dirname ,'./files/1.txt')        //__dirname 表示当前文件所处的目录(双下划线)

* 同步文件写入：
<!-- 打开文件 -->
var fd = fs.openSync(path,flags[,mode])  //文件路径，要操作的类型r w，文件的操作权限
    返回值：返回一个文件的描述符作为结果，通过该描述符对文件进行操作
<!-- 写入内容 -->
fs.writeSync(fd,string[,position[,encoding]])  //fd文件描述符，要写入的内容，从第几个字符开始写（写入的起始位置），写入的编码（默认utf-8）
<!-- 关闭文件 -->
fs.closeSync(fd)    //fd文件描述符

```javaScript
var fs = require('fs');
var fd = fs.openSync('./hello.txt','w');
fs.writeSync(fd,'天气真好。');
fs.closeSync(fd);
```

* 异步文件写入：

```javascript
fs.open('hello2.txt','w',function(err,fd){
    if(!err){
        fs.write(fd,'内容内容'，function(err){
        if(!err){    
            console.log('写入成功');
        }
        fs.close(fd,function(err){
            if(!err){
                console.log('文件已关闭');
            }
        });
    });
    }else{
        console.log(err);
    }
});
```

* 流式文件写入：
同步、异步、简单文件的写入都不适合大文件的写入，性能差，容易内存溢出、
fs.createWriteStream(path[,options])   //文件路径，配置参数

```javascript
var ws = fs.createWriteStream('hello3.txt');
// 可以通过监听流的open和close事件来监听流的打开和关闭
// once(事件字符串，回调函数) ---可以为对象绑定一个一次性的事件，该事件会在触发一次后自动失效
ws.once('open',function(){
    console.log('流打开了');
});
ws.once('close',function(){
    console.log('流关闭了');
});
ws.write('内容内容');
ws.write('内容内容内容');
ws.end();
```

## path 路径模块

满足用户对路径的处理需求。
导入path模块： const path= require('path')

path.join([...paths])    //将多个路径片段拼接成完整的路径字符串
path.basename(path[,ext])    //从路径字符串中，将文件名解析出来
path.extname()      //获取路径扩展名部分

```javascript
const pathStr = path.join('/a','/b/c','../','./d','e');     //输出 \a\b\d\e   (/c被../抵消了)
const pathStr2 = path.join(__dirname,'./files/1.txt');     //输出 当前文件所处目录\files\1.txt

const fpath = '/a/b/c/index.html';
var fullName = path.basename(fpath);   //输出 index.html
var nameWithoutExt = path.basename(fpath,'.html');   //输出 index
var fext = path.extname(fpath);   //输出 .html
```

## http模块

客户端：网络节点中，负责消费资源的电脑。
服务器：负责对外提供网络资源的电脑；服务器上安装了web服务器软件（IIS Apache等）
http模块用来创建web服务器。
导入http模块： `const http = require('http')`

* 服务器相关概念：
互联网每台服务器都有自己的IP地址，ping www.baidu.com
开发期间，自己的电脑既是服务器也是客户端，浏览器输入127.0.0.1就可以当作服务器访问了，对应域名是localhost。
域名服务器 提供IP地址和域名之间的转换服务。
一台电脑中，可以运行很多web服务，每个都对应唯一的端口号。每个端口号不能同时被多个web服务占用。URL中的80端口可省略。

* 创建web服务器：
1.导入http模块
2.创建web服务器实例
3.为服务器绑定request事件，监听客户端的请求
4.启动服务器

```javascript
const http = require('http')
const server = http.createServer()
server.on('request',(req,res)=>{   //客户端请求server，会触发request事件
// req是请求对象，包含与客户端相关的数据和属性。req.url是客户端请求的URL地址，req.method是客户端的method请求类型
    const str= `your request url is ${req.url},and request method is ${req.method}`
// res是响应对象，包含于服务器相关的数据和属性。res.end() 向客户端发送指定的内容，并结束这次请求的处理过程
    const str2= `your request url is ${res.url},and request method is ${res.method}`
    res.setHeader('Content-Type','text/html; charset=utf-8')  //设置响应头Content-Type的值，解决中文乱码
    res.end(str2)   //发送中文时会乱码，要手动设置编码格式
})
server.listen(80,()=>{     //启动web服务器
    console.log('http server running at http://127.0.0.1')
})
```

* 根据不同url显示不同HTML内容
1.获取请求的url地址
2.设置默认响应内容为404 Not found
3.判断用户请求的是否为/或/indext.html首页
3.判断用户请求的是否为/about.html页面
4.设置Conten-Type响应头，防中文乱码
5.使用res.end()把内容响应给客户端

```JavaScript
server.on('request',(req,res)=>{
    const url = req.url
    let content = '<h1>404 Not found</h1>'
    if(url === '/' || url === '/index.html'){
        content = '<h1>首页 </h1>'
    }else if(url === '/about.html'){
        content = '<h1>关于页 </h1>'
    }
    res.setHeader('Content-Type','text/html; charset=utf-8')
    res.end(str2)   
})
```

* 实现web服务器
把文件的实际存放路径，作为每个资源的请求url地址。
1.导入模块
2.创建基本的web服务器
3.将资源的请求url地址映射为文件的存放路径
    const url = req.url;
    const fpath = path.join(__dirname,url);
4.读取文件内容并响应给客户端  
    fs.readFile(fpath,'utf-8',(err,dataStr) => {
        if(err) return res.end('404 Not found')
        res.end(dataStr)
   })
5.优化资源的请求路径
    let fpath = ''
    if(url === '/'){
        fpath = path.join(__dirname,'./clock/index.html')
    }else{
        fpath = path.join(__dirname,'./clock',url)
    }

## 模块化

遵守固定的规则，把一个大文件拆成独立并相互依赖的多个小模块。
好处：提高代码的复用性、可维护性，可以实现按需加载。

* 模块化规范：对代码进行模块化的拆分与组合时，要遵守的规则。
eg: 引用模块、向外暴露成员的语法规则。
    CommonJS规定：
        每个模块内部，module变量代表当前的模块；
        module变量是一个对象，它的exports属性是对外的接口；
        加载某个模块，其实是加载该模块的module.exports属性。require()方法
* 模块分类：
    内置模块：node.js官方提供，fs,path,http
    自定义模块：用户创建的每个js文件
    第三方模块（包）：使用前要先下载

* 加载模块：require()方法
    const fs = require('fs')
    const test = require('./test.js')   //相对路径必须以./或../开头。 .js可省略
    const moment = require('moment')

* 模块作用域：在自定义模块中定义的变量、方法，只能在当前模块内被服务。（访问限制）
    每个js文件的代码都独立运行在一个函数里，不是全局作用域，一个模块中的变量和函数在其它模块中无法访问。
    好处：防止全局变量污染的问题。

* 向外共享模块作用域中的成员
    1.module对象：每个js自定义模块中都有一个module对象，存储与当前模块有关的信息
        module{
            id:,  
            path:,
            exports:{},
            parent:,
            filename, loaded, children, paths...
         }
    2.module.exports对象：将模块内的成员共享出去，供外界使用。
    3.exports对象：默认情况下，exports与module.exports指向同一个对象。最终结果还是以module.exports为准。
    4.require()导入模块时，得到的永远是module.exports所指向的对象。
    不要在同一个模块中同时使用exports和module.exports

```javaScript
//引入模块
var md = require("./module");
var math = require("./math");
console.log(md.x);
console.log(math.add(1,2));
md.sayName();

//向外部暴露变量属性或方法：
//将要暴露给外部的变量或方法设置为exports
module.js文件：
exports.x = "hello";   
exports.sayName=function(){
    console.log('lyq');
 };

math.js文件：
exports.add = function(a,b){
    return a+b;
}
```

* 模块标识：可以找到指定的模块，  ./math就是一个模块标识。

在node中有一个全局对象global，作用与网页window类似，
在全局中创建的变量/函数都会作为global的属性/方法保存。  global.x;

当node执行模块中的代码时，会首先在代码的最顶部添加代码：
    function(exports,require,module,_filename,_dirname){
    最底部添加 }
    实际上模块的代码都被包装在一个函数中执行，同时传递5个实参

```javascript
exports.x = "hello";
exports.data = {
    gender:"女",
    age:18
}
module.exports = {
    name:'lyq',
    age:18,
    sayName:function(){
       console.log('lyq');
    }
}
```

### 模块加载机制

模块在第一次加载后会被缓存，多次调用require()不会导致模块代码被执行多次。
模块都会优先从缓存中加载，提高模块的加载效率。

内置模块：加载优先级最高。require('fs')始终返回内置的fs模块，即便有同名的自定义包。
自定义模块：必须以./或../开头，否则会被当作内置或第三方模块加载。

* 如果require()导入自定义模块时，省略了扩展名，node会按顺序尝试加载以下文件
    1.按确切的文件名加载
    2.补全.js扩展名加载
    3.补全.json扩展名
    4.补全.node扩展名
    5.终端报错
第三方模块：node会从当前模块的父目录开始，尝试从/node_module文件夹中加载，如果没找到，再上一层，直到根目录都没找到，则报错。
目录作为模块标识符：
    1.在被加载的目录下查找package.json，寻找main属性，作为require()加载的入口；
    2.如果1失败，试图加载目录下的index.js文件；
    3.都失败的话，终端报错。

## 包 package

包实际上就是个压缩文件，解压后还原为目录。
包是基于内置模块封装出来的，提供更高级、方便的API，提高开发效率。
包的引入：var math = require("math")

* 初次装包完成
package.json 包管理配置文件：描述包的相关信息，以供外部读取分析。
    字段：name,description,version,dependencies,licenses...
        dependencies：记录用npm安装了哪些包和版本号
        devDependencies：有些包只在开发过程中会用到，项目上线后不会用到，就记录在此节点中
        <!-- json文件内不能写注释!! -->
node_modules 存放所有已安装到项目中的包，require()导入第三方包时，从该目录查找并加载包。
    开发时，要把node_modules文件夹，添加到.gitignore忽略文件中。

* 包的分类
    项目包：开发依赖包、核心依赖包
    全局包：安装时用了-g 参数，一般是工具类的包
* 包结构：组织包内的各种文件
    包必须以单独的目录存在
    包的顶级目录下必须包含package.json文件
    package.json中必须包含name,version,main这三个属性; main是入口文件，默认index.js
    README.md使用说明文档，包含：安装方式、导入方式、开源协议...

* 包的语义化版本规范：
    点分十进制形式进行定义，2.24.0
    第一位：大版本  ，第二位：功能版本  ，第三位数字：Bug修复版本
版本提升规则：只要前面的版本号增长了，后面的归零。2.24.5---3.0.0

## NPM (Node Package Manager 包管理工具)

是node.js默认的，用js编写的软件包管理系统，帮助node完成第三方模块（包）的发布、安装、依赖。

* 基础命令：（install==i    remove==r   包名@2.22.2 指定版本号）
    npm -v                  //查看版本号
    npm search 包名         //搜索相关模块包
    npm init -y             //初始化快速新建package.json（项目目录名要英文，不能空格）
  **npm install**           //下载当前项目所依赖的包，一次性安装所有依赖包
    npm install 包名 -g     //全局模式安装包（一般是工具）
    npm install 包名        //当前目录安装包，也会默认添加到dependencies
  **npm install 包名 --save**//安装包，并添加到Dependencies中
    npm install 包名 -D      //安装包，并添加到devDependencies中，等价--save-dev
    npm uninstall 包名       //卸载包，并从dependencies中移出，别名remove,rm,e,un,unlink
    npm list -g                //查看所有全局安装的包
    npm list 包名            //查看某模块的版本号
    npm update 包名            //更新包
    npm -g install 包名@版本号  //指定更新包的版本

dependencies：运行时的依赖，发布后，生产环境下还要用的模块，如jquery
devDependencies：开发时的依赖，发布时不用，如项目中的gulp，压缩css、js的模块

* 切换npm的下包镜像源：
npm config get registry    //查看当前镜像源
npm config set registry=<https://registry.npm.taobao.org/>     //切换为淘宝镜像源
npm config get registry    //检查是否下载成功

* nrm  （npm镜像源管理工具）快速在npm源间切换。
安装nrm：npm i nrm -g

nrm -V           //版本查询
nrm ls           //查看可用的源
nrm use taobao   //切换源
nrm test         //测试各个源的速度，*指向当前源

* nvm  （node版本管理工具）对node进行选版本安装、版本切换、查看。
nvm  v     //查看版本号
nvm current    //查看当前版本
nvm list       //查看本地已安装的版本
nvm list available    //查看可安装的版本
nvm on   //打开nodejs控制
nvm off  //关闭nodejs控制

* npx  调用项目内部安装的模块，执行各种命令
智能的识别模块，如果模块存在，就使用。如果不存在，就临时下载，用完就删除。
npx webpack -v

## Buffer 缓冲区

服务器接收请求，返回响应，用户发送的请求都是二进制数据，存在buffer里。
结构和方法类似数组，数组不能存储二进制文件，buffer弥补数组不足，大小固定不变。
buffer中存储二进制数据，显示时都是以十六进制形式显示。(数据最终以二进制形式传递给客户端)
buffer中每个元素范围都是从 00-ff。 // 0-255，一个元素占用内存一个字节
使用不需要引入模块，直接使用。

```js
var str = 'Hello 尚硅谷';   //一个汉字占3字节
//将字符串保存到buffer中
var buf = Buffer.from(str); 
console.log(buf);  //<Buffer 48 65 6c 6c 6f 20 e5 b0 9a...>    unicode编码
buf.length  //占用内存的大小(字节)，15
str.length  //字符串的长度，9
buf.toString()  //把缓冲区的数据转换成字符串的形式
// 创建指定大小的buffer
var buf2 = Buffer.alloc(10);  //10字节，大小不能改变，是对底层内存的直接修改，在v8堆栈外分配了原始内存空间
// 用索引来操作内部元素
buf2[0]=88;
buf2[1]=0xaa;
console.log(buf2[1]);   // 170,只要数字在控制台或页面中输出就是十进制
// .toString(几进制)
```
