<!-- 
#### 2.获取元素

* 标签名获取

  ```html
  <ul>
      <li>1</li>
      <li>2</li>
  </ul>
  
  <script>
      var lis = document.getElementsByTagName('li');   //返回页面里所有li对象的集合，以伪数组形式存储，有没有li都返回伪数组
      console.log(lis);   
      console.log(lis[0]);
      for(var i=0;i<lis.length;i++){   //遍历，依次打印（动态）元素对象
          console.log(lis[i]);
      }
      
    /*获取某个父元素内部所有指定标签名的子元素*/
      var ul = document.getElementsByTagName('ul');  
      console.log(ul[0].getElementsByTagName('li'));  //父元素必须是单个对象 ul[0] 
      //或者<ul id="ul">
      var ul = document.getElementsByTagName('ul');  
      console.log(ul.getElementsByTagName('li'));
    
  </script>
  ```

* h5新增获取

  ```html
  <div class="box">1</div>
  <div class="box">2</div>
  <div id="nav">
      <ul>
          <li>1</li>
          <li>2</li>
      </ul>
  </div>
  
  <script>
      var boxes= document.getElementByClassName('box');  //根据类名获取某些元素集合
      console.log(boxes);
      
      var firstBox= document.querySelector('.box');  //根据选择器返回第一个元素对象
      var nav= document.querySelector('#nav');   //选择器要加符号.  #
      var li= document.querySelector('li');
      
      var allBox= document.querySelectorAll('.box');   //返回选择器的所有元素对象集合
  
  </script>
  ```

* 特殊元素获取    - body   html

  ```html
  <script>
      var bodyEle= document.body;   //返回body元素对象
      console.log(bodyEle);
      
      var htmlEle= document.documentElement;   //返回html元素对象
  </script>
  ``` -->

<!-- #### 3.事件基础     - 触发 响应机制 -->

<!-- 
```html
<button id="btn">点击</button>

<script>
    var btn= document.getElementById('btn');
    btn.onclick= function(){
        alert('已点击！！！');
    }
</script>  
``` -->

<!-- #### 4.操作元素

##### （1）改变元素内容

```html
<button>显示当前时间</button>
<div>时间</div>

<script>
    var btn= document.querySelector('button');
    var div= document.querySelector('div');
    btn.onclick= function(){
      div.innerHTML=new Date();  
    }
</script>
``` -->

<!-- ##### （2）修改元素属性

```html
<div> 123
          456
</div>

<script>
    var div= document.querySelector('div');
    div.innerText= '今天是：2020-6-14';        //不识别html标签 不标准
    div.innerHTML= '<strong>今天是</strong>：2020-6-14';  //w3c 标准
  //都是可读写的，可以获取元素内容
    console.log(div.innerText);  //去除空格、换行
    console.log(div.innerHTML);  //保留空格、换行
</script>
```

```html
<button id="first">1</button>
<button id="second">2</button>
<img src="1.jpg" title="悬停名字1"/>

<script>
    //修改src属性
    var first = document.getElementById('first');
    var second = document.getElementById('second');
    var img = document.querySelector('img');
    second.onclick= function(){
        img.src= '2.jpg';
        img.title='悬停名字2';
    }
    first.onclick= function(){   
        img.src= '1.jpg';
        img.title='悬停名字1';
    }
</script>
``` -->

<!-- ###### 分时间 问候并显示不同图片

  ```html
  <img src="1.jpg" alt="" />
  <div>上午好</div>
  
  <script>
      var img= document.querySelector('img');
      var div= document.querySelector('div');
      var date= new Date();
      var h= date.getHours();   //得到当前的小时数
      if(h < 12){
          img.src='1.jpg';
          div.innerHTML='上午好！！！';
      } else if(h < 18){
          img.src='2.jpg';
          div.innerHTML='下午好！！！';
      } else{
          img.src='3.jpg';
          div.innerHTML='晚上好！！！';
      }
          
  </script>
  ``` -->

##### （3）表单属性操作

```html
<button>按钮</button>
<input type="text" value="admin" />

<script>
    var btn= document.querySelector('button');
    var input= document.querySelector('input');
    btn.onclick= function(){
        input.value= '已点击！！！';  //表单里的值、文字内容是通过value来修改的
        this.disabled= true;   //禁用按钮，不能再点击
    }
    
</script>
```

* ###### 查看密码明文  - 点击按钮，把文本框类型改为文本框,flag 值0/1

  ```html
  <div class="box">
      <label for="">
          <img src="close.png" id="eye" />
      </label>
      <input type="password" name="" id="pwd">
  </div>
  
  <script>
      var eye= document.getElementById('eye');
      var pwd= document.getElementById('pwd');
      var flag = 0;
      eye.onclick= function(){
          if(flag == 0){
              pwd.type='text';
              eye.src='open.png';
              flag = 1;
          }else{
              pwd.type='password';
              eye.src='close.png';
              flag = 0;
          }
      }
  </script>
  ```

<!-- ##### （4）样式属性操作    - 大小、颜色、位置 -->

<!-- //行内样式修改

```html
<style>
    div{
        width: 200px;
        height:200px;
        background-color: red;
    }
</style>

<div>123</div>

<script> 
    var div= document.querySelector('div');
    div.onclick= function(){
        this.style.backgroundColor ='blue';   //样式采取驼峰命名法
        this.style.width ='300px';
    }   //js产生的是行内样式，css权重高
</script>
``` -->

  <!-- //类名样式操作   -适合样式较多的情况

```html
<style>
      .first{
          width: 200px;
          height:200px;
          background-color: red;
      }
      .change{
          width: 300px;
          background-color: blue;
      }
  </style>

  <div class="first">文本</div>

  <script>
      var text= document.querySelector('div');
      text.onclick= function(){
          this.className = 'change';   //类名直接改为change，覆盖原先的类名
          //this.className = 'first change';   //多类名，保留原先的类名 ,+=也可
      }  
  </script>
``` -->

###### 关闭淘宝二维码   - 点击按钮，隐藏盒子  display: none

  ```html
  <div class="box">
      淘宝二维码
      <img src="tb.png" />
      <i class="close-btn" style="cursor: pointer;"> × </i>  //i语义更多是图标
  </div>
  <script>
      var btn= document.querySelector('.close-btn');
      var box= document.querySelector('.box');
      btn.onclick= function(){
          box.style.display='none';
      }
  </script>
  ```

###### 显示隐藏文本框内容 - 获取焦点就消失   - placeholder获取焦点并输入内容才消失

```html
<input type="text" value="请输入">

<script>
    var text= document.querySelector('input');
    text.onfocus= function(){
        if(this.value==='请输入'){  //不加判断，重获焦点时输入任何内容都清空
            this.value = '';       //获取焦点时 清空文字
        }
        this.style.color='#333';   //输入的文字颜色变深
    }
    text.onblur= function(){
        if(this.value===''){    
            this.value='请输入';    //失去焦点，内容为空时 出现文字
        }
        this.style.color='#999';   //文字颜色变浅
    }
</script>
```

* ###### 密码框验证信息

  ```html
  <div class="register">
      <input type="password" class="ipt" />
      <p class="message">请输入6-16位密码</p>
  </div>
  
  <script>
      var ipt= document.querySelector('.ipt');
      var message= document.querySelector('.message');
      ipt.onblur= function(){
          if(this.value.length < 6 || this.value.length > 16){
              message.style.color='red';
              message.innerHTML='输入的位数不对，要求6-16位';
          }else{
              message.style.color='green';
              message.innerHTML='输入的正确，阔以';
          }
      }
  </script>
  ```
  
* ###### 排他思想              - 同一组元素，想要某一个元素实现某种样式

  ```html
  <button>1</button>
  <button>2</button>
  <button>3</button>
  <button>4</button>
  <button>5</button>
  
  <script>
      var btns= document.getElementsByTagName('button');
      for(var i=0;i<btns.length;i++){
          btns[i].onclick= function(){
              
              for(var i=0;i<btns.length;i++){
                  btns[i].style.backgroundColor = '';
              }        //相当于初始化，清除所有元素的样式
              
              this.style.backgroundColor = 'red';    //给当前元素设置样式
          }
      }
  </script>
  ```

* ###### 百度换肤效果

  ```html
  <ul class="baidu">
            <li><img src="1.jpg" ></li>
            <li><img src="2.jpg" ></li>
            <li><img src="3.jpg" ></li>
            <li><img src="4.jpg" ></li>
  </ul>
          
  <script>
      var imgs= document.querySelector('.baidu').querySelectorAll('img');
      for(var i=0;i<imgs.length;i++){
          imgs[i].onclick= function(){
              document.body.style.backgroundImage='url(' + this.src + ')';
              //整个url都是字符串 拼接，字符串+变量+字符串
          }
      }
  </script>
  ```

* ###### 表格隔行变色

  ```html
  <style>
      .bg{
          background-color: red;
      }
  </style>
  <table>
      <thead>
          <tr>
              <th>表头1</th>
              <th>表头2</th>
              <th>表头3</th>
          </tr>
      </thead>
      <tbody>
          <tr>
              <td>单元格1</td>
              <td>单元格2</td>
              <td>单元格3</td>
          </tr>
            <tr>
              <td>单元格4</td>
              <td>单元格5</td>
              <td>单元格6</td>
          </tr>
      </tbody>
  </table>
  
  <script>
      var trs= document.querySelector('tbody').querySelectorAll('tr');  //一整行
      for(var i=0;i<trs.length;i++){
          trs[i].onmouseover=function(){
              this.className='bg';
          }
          trs[i].onmouseout=function(){
              this.className='';
          }
      }
  
  </script>
  ```
<!-- 
* ###### 表单全选 取消全选

  ```html
  <div class="wrap">
      <table>
          <thead>
              <tr>
                  <th>
                      <input type="checkbox" id="j_cbAll">
                  </th>
                  <th>商品</th>
                  <th>价格</th>
              </tr>
          </thead>
          <tbody id="j_tb">
                <tr>
                  <th>
                      <input type="checkbox">
                  </th>
                  <th>iphone</th>
                  <th>8000</th>
              </tr>
                <tr>
                  <th>
                      <input type="checkbox">
                  </th>
                  <th>ipad air</th>
                  <th>3600</th>
              </tr>
          </tbody>
      </table>
  </div>
  
  <script>
      var j_cbAll = document.getElementById('j_cbAll');   //全选按钮
      var j_tbs = document.getElementById('j_tb').getElementsByTagName('input'); 
      j_cbAll.onclick= function(){   
          for(var i=0;i<j_tbs.length;i++){
              j_tbs[i].checked = this.checked;
          }
      }
      // 2.下面的复选框全部都选中，全选框才能被选中
      for(var i=0;i<j_tbs.length;i++){
          j_tbs[i].onclick=function(){
              var flag= true;   //控制全选按钮是否选中
              // 每次点击下面复选框都要循环检查是否全部选中      
              for(var i=0;i<j_tbs.length;i++){
                  if(!j_tbs[i].checked){   
                      flag = false;
                      break;  // 有按钮没选中，就退出循环 不用再判断，提高效率
                  }
              }//如果复选框全选中，不执行if，checked值是true,全选框被选中
              j_cbAll.checked= flag;
          }
      }
  </script>
  ``` -->

<!-- ##### （5）自定义属性

  ```html

  <div id="demo" class="nav" data-index="1"></div>
  
  <script>
  1.获取属性值：
      var div= document.querySelector('div');
      console.log(div.id);  // element.属性   内置属性值
      console.log(div.getArribute('data-index'));  // element.getArribute('属性')  自定义属性
  
  2.设置属性值：
      div.id= 'test';           // element.属性 ='值';
      div.className='navs';
      
      div.setAttibute('data-index',2);  // element.getArribute('属性'，'值');
      div.setAttibute('class','footer'); 
      
  3.移除属性：
      div.removeAttribute('data-index');
  </script>
  ```
   -->
###### tab切换栏

  ```html
  <style>
      .tab_list ul li {
        float: left;
          list-style: none;
    }
      .tab_list .current {
          background-color: red;
          color: #fff;
      }
      .item {
          display: none;
      }
  </style>
  
  <div class="tab">
      <div class="tab_list">
          <ul>
              <li class="current">首页</li>
              <li>社区</li>
              <li>消息</li>
              <li>个人</li>
          </ul>
      </div>
      <div class="tab_con">
          <div class="item" style="display: block;">首页模块内容</div>
          <div class="item">社区模块内容</div>
          <div class="item">消息模块内容</div>
          <div class="item">个人模块内容</div>
      </div>
  </div>
  
  <script>
      var lis= document.querySelector('.tab_list').querySelectorAll('li');
      var items=document.querySelectorAll('.item');
      for(var i=0;i<lis.length;i++){
          //给li设置索引号
          lis[i].setAttribute('index',i);
          lis[i].onclick= function(){
             
              for(var i=0;i<lis.length;i++){
                  lis[i].className= '';
              }
              this.className= 'current';   //排他思想
              //点击li后 内容跟着变
              var index= this.getAttribute('index');
              for(var i=0;i<items.length;i++){
                  items[i].style.display= 'none';   
              }
              items[index].style.display= 'block';  //排他思想
          }
      }
  
  </script>
      
  ```
