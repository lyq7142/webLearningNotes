# cookie

cookie是存储与访问者计算机中的变量，每当计算机通过浏览器访问页面，就可以通过js创建和读取cookie。
cookie是存于用户硬盘的一个文件，对应于一个域名，浏览器再次访问该域名，可以使用此cookie。cookie可以跨越一个域名下的多个网页，但不能跨域多个域名使用。
cookie和session都能变成计算机中的变量，但session运行在服务端，客户端只能通过cookie读取和创建变量。

应用：
用户第一次登录网站，将登录信息存放在cookie中，下次登录可以直接获取cookie中的用户名和密码来登录。
关闭电脑后，恢复购物车里的物品（少用，一般存数据库）
页面间传值

## cookie的使用

document.cookie = "name=value;expires=evalue;path=pvalue;domain=dvalue"

name必选：要存入的属性和值
expires：有效时长
path：默认对于同一目录下的所有页面有效
domain：默认在当前域名访问
secure：默认true不安全传输
