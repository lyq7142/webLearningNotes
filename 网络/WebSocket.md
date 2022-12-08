# WebSocket

http缺陷：通信只能由客户端发起，做不到服务器主动向客户端推送信息
=>单向请求，如果服务器有连续的状态变化，客户端获知很麻烦，要使用 轮询（每隔段时间，发出一个询问--效率低，浪费资源）---聊天室

## WebSocket简介

* 特点：
1.服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息---双向平等对话，服务器推送技术
2.基于TCP协议，服务器端实现比较容易
3.兼容HTTP，默认端口也80和443，握手阶段是HTTP不容易被屏蔽，能通过HTTP代理服务器
4.数据格式轻量，性能开销小，高效通信
5.可以发送文本或二进制数据
6.没有同源限制，客户端可以与任意服务器通信
7.协议标识符ws（加密wss），服务器网址就是url

> ws://example.com:80/some/path

## 客户端简单示例

    var ws = new WebSocket("wss://echo.websocket.org");
    ws.onopen = function(evt) { 
      console.log("Connection open ..."); 
      ws.send("Hello WebSockets!");
    };
    ws.onmessage = function(evt) {
      console.log( "Received Message: " + evt.data);
      ws.close();
    };
    ws.onclose = function(evt) {
      console.log("Connection closed.");
    };  

## 客户端的API

* websocket构造函数--新建实例
* webSocket.readyState
readyState返回实例四种状态：
  CONNECTING 0 正在连接
  OPEN       1 连接成功
  CLOSING    2 正在关闭
  CLOSED     3 连接已关闭

> WebSocket.CONNECTING ...

* webSocket.onopen 指定连接成功后的回调，多个回调用addEventListener
* webSocket.onclose 指定连接关闭后的回调
* webSocket.onmessage 指定收到服务器数据（文本/二进制）后的回调
* webSocket.send() 向服务器发送数据
* webSocket.bufferedAmount 还有多少字节的二进制数据没发送出去，判断发送是否结束
* webSocket.onerror 指定报错时的回调函数

## 服务器端实现

* 常用node实现：
μWebSockets
Socket.IO
WebSocket-Node
