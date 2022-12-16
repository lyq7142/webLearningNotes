# 布局

## 弹性盒子 flexbox

页面需要适应不同屏幕大小及设备类型时，确保元素有恰当行为的布局方式。
组成：弹性容器container、弹性子元素item。
弹性容器设置：
  display: flex ;    // 或 inline-flex
容器内有多个子元素，通常一行内显示，默认每个容器只有一行。
弹性盒子只定义了子元素如何在容器内布局。

```html
<!-- 默认，从左往右排列 -->
<div class="flex-container">
  <div class="flex-item">flex item 1</div>
  <div class="flex-item">flex item 2</div>
  <div class="flex-item">flex item 3</div> 
</div>
<!-- 从右向左 -->
body {
    direction: rtl;   //right-to-left
}
<!-- flex-direction 子元素在父容器中的位置 -->
flex-direction: row（默认） | row-reverse | column | column-reverse ;  
              // 左往右，右往左，纵向，反转纵向
<!-- jusyify-content 内容对齐，把弹性项沿着容器主轴线对齐 -->
justify-content: flex-start（默认） | flex-end | center | space-between | space-around ;
                //居左，居中，居右，均分（贴边），均分（不贴边）
<!-- align-items 纵向对齐方式 -->
align-items: flex-start | flex-end | center | baseline | stretch（默认） ;
<!-- flex-wrap 子元素换行方式 -->
flex-wrap: nowrap（默认） | wrap | wrap-reverse | initial | inherit ;
        //单行 可能溢出，多行 子项内部会断行，反转wrap排列
<!-- align-content 修改wrap行为，设置各行的对齐 -->
align-content: flex-start | flex-end | center | space-between | space-around | stretch(默认) ;
<!-- order 子元素排序属性，值小的排前面 -->
order: -1;
<!-- margin:auto 垂直水平居中 -->
margin: auto;
```

### 多媒体查询

@media not|only|all  设备类型 and(表达式){
  //css代码
}

多媒体类型：all print screen...

@media screen and (max-width: 480px) { }
@media screen and (min-width: 480px) { }
@media screen and (max-width: 699px) and (min-width: 520px) { }

## 网格grid布局

一个父元素及多个子元素组成。
网格容器：设置 display: grid ;    //或inline-grid
网格元素：直系子元素
一个网格轨道就是网格中任意两条线之间的空间。
一个网格单元是在一个网格元素中最小的单位。
一个fr单位代表容器中可用空间的一等份。
列column：网格元素的垂直线方向
行row：网格元素的水平线方向
网格间距Column Gap：两个网格单元之间的网格横向或纵向间距

```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
</div>
<!-- 网格容器 -->
<!-- 定义列 -->
grid-template-columns: 1fr 1fr 1fr;
<!-- 定义行 -->
grid-template-rows: 100px 300px;
<!-- 主轴对齐网格 -->
justify-content: space-evenly | space-around | space-between | center | start |end ;
<!-- 垂直对齐 -->
align-content: space-evenly | space-around | space-between | center | start | end ;
<!-- 网格元素 -->
<!-- 调整网格间距 -->
grid-column-gap   列间距
grid-row-gap      行间距
grid-gap: 50px 100px;  简写
<!-- 网格线 -->
// 单元格从第一列到第三列
grid-column-start: 1;  
grid-column-end: 3;
grid-column: 1 / 5; 第一列到第五列结束
grid-column: 1 / span 3;  横跨3列
// 单元格从第一行到第三行
grid-row-start: 1;
grid-row-end: 3;
grid-area: 1 / 2 / 5 / 6 ;  从第一行和第二列开始，到第五行和第六列结束
```

## 两/三栏布局

1.两栏布局，左定宽，右自适应

```css
.left {
  float: left;
  width: 200px;
}
.right {
  overflow: hidden; /* 变成BFC清除左侧浮动元素影响 */
}
```

2.三栏布局，圣杯、双飞翼
两侧宽度固定，中间自适应

* 三栏布局（平均分布）

```html
<div class="Grid">
  <div class="Grid-cell col3">1/3</div>
  <div class="Grid-cell col3">1/3</div>
  <div class="Grid-cell col3">1/3</div>
</div>
```

```css
/* 1.设置父级弹性盒子，子盒子均分 */
.Grid {
  display: flex;
}
.Grid-cell {
  flex: 1;  /*等比伸缩*/
}
/* 2.flex百分比 */
.col3 {
  flex: 0 0 33.3%;
}
/* 3.流式布局 */
.col3 {
  width: 33.3%
}
```
