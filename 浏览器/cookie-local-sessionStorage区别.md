# Cookies  localStorage 和 sessionStorage 的区别

共同点：都是保存在浏览器端，且同源的

* 区别：
1.有效期
cookies是会话机制，它是在设置的时间内（自己设置的）有效，即使窗口或浏览器关闭。
localStorage是属于本地存储的一种，是永久存储，除非手动删除，否则一直有效。
sessionStorage是属于本地存储的一种，是临时存储，在关闭当前页面或者当前浏览器窗口前有效。
2.存储数据的大小
cookies存储的数据大小在4k左右，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。
​localStorage存储的数据大小在20M左右。
​sessionStorage存储的数据大小在5M左右。
3.作用范围
cookies在所有同源窗口都是共享的。
​localStorage是同一浏览器不同标签页之间数据可以共享。
​sessionStorage中存储的数据是只能在当前标签页中使用，不在不同浏览器窗口中共享，即使是同一个页面。
4.安全性
​cookies的安全性比loaclStorage和sessionStorage的安全性好。
5.web Storage支持事件通知机制，可以将数据更新的通知发送给监听者。
6.web Storage的api接口使用更方便。
7.cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
