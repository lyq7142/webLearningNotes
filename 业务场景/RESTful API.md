# RESTful API

一种设计风格，API接口设计规范

## 一、协议

API与用户间通信，HTTPS常用。

## 二、域名

尽量将API部署在专用域名下  api.example.com
如果api很简单，不会扩展，可以放主域名下 example.org/api/

## 三、版本 versioning

将api版本号放入url   api.example.com/vi
或把版本号放在http头信息中。

## 四、路径 endpoint

路径（终点）：API的具体网址
RESTful架构中，每个网址->资源，所以网址中不能有动词，只能有名词，且与数据库表格名对应 复数  api.example.com/v1/zoos

## 五、http动词、url命名规范

对于资源的具体操作->http动词表示

* 常用动词：
GET (SELECT) 从服务器取出资源
POST (CREATE) 新建资源
PUT (UPDATE) 更新资源（客户端提供改变后的完整资源）
PATCH (UPDATE) 更新资源（客户端提供改变的属性）
DELETE (DELETE) 删除资源
不常用动词：
HEAD 获取资源的元数据
OPTIONS 获取信息

example.com/api/users GET 获取所有用户信息
example.com/api/users/1 GET 获取标识为1用户信息

## 六、参数命名规范

* 常见参数：
?limit=10：指定返回记录的数量
?offset=10：指定返回记录的开始位置。
?page=2&per_page=100：指定第几页，以及每页的记录数。
?sortby=name&order=asc：指定返回结果按照哪个属性排序，以及排序顺序。
?animal_type_id=1：指定筛选条件

## 七、状态码 status codes

200 OK - [GET]：服务器成功返回用户请求的数据，该操作是幂等的（Idempotent）。
201 CREATED - [POST/PUT/PATCH]：用户新建或修改数据成功。
202 Accepted - [*]：表示一个请求已经进入后台排队（异步任务）
204 NO CONTENT - [DELETE]：用户删除数据成功。
400 INVALID REQUEST - [POST/PUT/PATCH]：用户发出的请求有错误，服务器没有进行新建或修改数据的操作，该操作是幂等的。
401 Unauthorized - [*]：表示用户没有权限（令牌、用户名、密码错误）。
403 Forbidden - [*] 表示用户得到授权（与401错误相对），但是访问是被禁止的。
404 NOT FOUND - [*]：用户发出的请求针对的是不存在的记录，服务器没有进行操作，该操作是幂等的。
406 Not Acceptable - [GET]：用户请求的格式不可得（比如用户请求JSON格式，但是只有XML格式）。
410 Gone -[GET]：用户请求的资源被永久删除，且不会再得到的。
422 Unprocesable entity - [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误。
500 INTERNAL SERVER ERROR - [*]：服务器发生错误，用户将无法判断发出的请求是否成功。

## 八、错误处理 error handling

返回的信息中将error作为键名，出错信息作为键值即可。
{
    error: "Invalid API key"
}

## 九、统一返回数据格式

code——包含一个整数类型的HTTP响应状态码。
status——包含文本：”success”，”fail”或”error”。HTTP状态响应码在500-599之间为”fail”，在400-499之间为”error”，其它均为”success”

message——当状态值为”fail”和”error”时有效，用于显示错误信息。参照国际化（il8n）标准，它可以包含信息号或者编码，可以只包含其中一个，或者同时包含并用分隔符隔开。
data——包含响应的body。当状态值为”fail”或”error”时，data仅包含错误原因或异常名称、或者null也是可以的

```json
// 返回成功的响应json格式
{
  "code": 200,
  "message": "success",
  "data": {
    "userName": "123456",
    "age": 16,
    "address": "beijing"
  }
}
// 返回失败的json格式
{
  "code": 401,
  "message": "error  message",
  "data": null
}
```
