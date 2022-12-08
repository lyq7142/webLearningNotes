# 移动app开发

## 1.原生应用 Native App

* 原生的Android平台
* 原生的iOS平台

基于操作系统，交互强，是完整的app，可拓展性强，要用户下载安装使用。
模式通常基于 云服务器数据+APP应用客户端 构成。
不同平台使用相应的语言、开发工具和操作系统。
iOS ：Objective-C、swift、Xcode、macOS
Android ：Java、kotlin、Eclipse、Android Studio、Windows、macOS、Linux
优点：交互性最强、性能最好、功能强大、直接调用官方api
缺点：平台不通用，开发成本高，更新慢，维护成本高

## 2.网站应用 Web App

h5编写的app，不用下载安装，可以运行在PC、Android、iOS端等。
轻应用，生存在浏览器中的应用、触屏版的网页应用（本质上是为移动浏览器设计的基于web的应用）。
html5 app开发模式，模式基于 HTML5云网站+APP应用客户端，应用的数据是从云端获取，客户端只安装框架部分。
HTML5\CSS\JS，一次编写，处处运行。
优点：开发成本低，跨平台，方便调试，维护成本低，更新块，省手机内存
缺点：原生功能调用有限，依赖于网络，页面访问速度慢，性能低，用户体验差，临时性入口，用户留存率低
<!-- 框架：PhoneGap、Ionic、Hbuilder、appcan、Wex5、ApiCloud、Jquery Mobile -->

## 3.混合应用 Hybrid App

半原生半web的混合类app，（原生少，大部分web），要下载安装，可以运行在Android、iOS端。把HTML5应用嵌入到一个原生容器里（网站套了个壳），主要应用：新闻阅读类，信息展示类
优点：开发成本低，跨平台，调试方便，维护成本低，更新自由，学习成本低，功能完善，性能体验比web app好，性能要求高的页面用原生实现
缺点：性能比原生低，不适用于交互性较强的app或性能要求高的app
技术：PhoneGap、Ionic、Cordova、APPCan、DCloud（推荐）、API Cloud

## 4.跨平台开发 Native App

使用类似web技术开发Native App
技术：React Native（主流）---React + 原生
      Weex（少）         ---Vue + 原生
      Flutter            ---Dart
优点：大部分代码可复用，开发成本小于原生，性能接近原生，单一技术栈，跨平台，社区繁荣，容易解决问题
缺点：部分跨平台，还是会有差别，学习成本，技术要求高，难驾驭好

## 5.另类 App (web技术主导)

* 小程序：微信、支付宝、头条小程序...
* 微网页：微信公众号...
* 快应用：类似小程序，混合app
* PWA：离线应用，网站拥有类似app的入口，提供网站的离线应用访问，兼容不好

## 选择开发模式

纯Native App：性能体验要求极高，不追求开发效率，eg微信 支付宝
web App：不追求用户体验性能，没有额外功能，只有些信息展示
Hybrid App：不追求用户体验性能，有一些简单交互的场景
React Native App：追求性能，开发效率，舍得前期投入
小程序：开发成本最低，体验仅次于原生+跨平台NativeApp
