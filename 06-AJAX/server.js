//运行指令：nodemon server.js   更新时自动重启
//1.引入express
const express = require('express');
//2.创建应用对象
const app = express();

// 创建路由规则,request是对请求报文的封装
app.get('/server',(request,response)=>{
    //设置响应头  
    //允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    response.send('hello ajax get');

});
// .all 接收任意类型的请求头
app.all('/server',(request,response)=>{
    //设置响应头  
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    //设置响应体
    response.send('hello ajax post...');
});
app.all('/json-server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应体
    const data={
        name:'lyq',
    };
    // 对对象进行字符串的转换
    let str=JSON.stringify(data);
    response.send(str);
});
// 针对IE缓存问题
app.all('/ie',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send('hello ie..');
});
// 延时响应
app.all('/delay',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.setHeader('Access-Control-Allow-Headers','*');
    setTimeout(()=>{
        response.send('延时响应');
    },3000)
    
});
// jquery服务
app.all('/jquery-server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Headers','*');
    response.setHeader('Access-Control-Allow-Origin','*');
    const data={name:'lyq'};
     // response.send('hello jquery ajax..');
    response.send(JSON.stringify(data));
});

// axios服务
app.all('/axios-server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Headers','*');
    response.setHeader('Access-Control-Allow-Origin','*');
    const data={name:'lyq'};
     // response.send('hello axios ajax..');
    response.send(JSON.stringify(data));
});

// fetch服务
app.all('/fetch-server',(request,response)=>{
    response.setHeader('Access-Control-Allow-Headers','*');
    response.setHeader('Access-Control-Allow-Origin','*');
    const data={name:'lyq'};
     // response.send('hello fetch ajax..');
    response.send(JSON.stringify(data));
});

//4.监听端口启动服务
app.listen(8000,()=>{
    console.log("服务已启动，8000端口监听中....");
})
