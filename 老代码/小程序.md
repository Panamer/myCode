- 小程序下载 https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html?t=20161122
- 小程序API https://mp.weixin.qq.com/debug/wxadoc/dev/framework/MINA.html
- sublime 插件 https://github.com/tc-h5
- 在pages文件夹里建项目目录
- 在app.json里配置项目文件路径
##### - 结构
```
<view class="page>
    <view class="hd">
        <view class="bd">{{data}}</view>
```
##### 绑定数据

```
{{flag}} 在js:data里直接键值对存在    或者:
var app = getApp();   name:app.globalDataname (初始化数据里定义)
```
##### 条件

```
<view wx:if="{{a>90}}"> 90 </view>
<view wx:elif="{{a>80}}"> 80 </view>
<view wx:else > 60 < /view>
```
##### 循环

```
<view wx:for="{{list}}"> {{index}}  {{item.name}} </view>
<view wx:for="{{list}}" wx:for-item="a" wx:for-index="b" wx:key="*this"></view>
```
index是默认的序号变量  item是默认循环项 分别可以通过上面的方法修改他们的值
##### if 和 hidden的区别

```
<view wx:if="{{flag}}"></view>
<view hidden="{{flag}}"></view>
```
if不参加数据结构渲染 hidden只是隐藏  类似于 ng-if  ng-hide
##### block只是用来包裹元素，不会被渲染


##### template
```
<template name="info">
    <view>
        <text> {{name}} </text>
    </view>
</template>
<template is="info" data="{{...item}}" />     es6的写法
```

```
<import src="a.wxml" />
<template is="info" data="{{...item}}" />
```

```
<include src="a.wxml" />
<template is="info" data="{{...item}}" />
```
import建议用比较强大  include只支持静态页面

##### 点击事件

```
<button bindtap="tapevent"></button>  直接在page.js里写事件
```
##### 修改data里的数据

```
在事件里 通过 this.setData({ a:() })修改
func1:function(e){
    console.log(e);
    this.setData({    修改数据的方式
        msg:(new Data-0)  产生一个随机数
    })
}
```



