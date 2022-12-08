# JSON

json：js对象表示法；
是存储和交换文本信息的语法，类似Ajax，键值对方式。
长度比xml小，读写速度快，可以用js内的方法解析，转成js对象。

## JSON语法规则

书写格式：名称/值对   "name":"lyq"
值的类型：number/string/boolean/array/object/null
// 大括号括起来表示一个json对象
{
    "user":[
        {"name":"lyq","age":22},
        {"name":"lyq","age":23},
        {"name":"lyq","age":24}
    ]
}

## JSON解析

* JSON.parse() 解析json字符串
var jsondata='{"user:[...上文...]"}';
var jsonobj = JSON.parse(jsondata)

* JSON.stringify() 将js对象或值转换为json字符串
