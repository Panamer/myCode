
```
js和jquery中的遍历对象和数组（forEach，map，each）

arr[].forEach(function(value,index,array){

　　//do something

})

参数：value数组中的当前项,index当前项的索引,array原始数组；
数组中有几项，那么传递进去的匿名回调函数就需要执行几次；
理论上这个方法是没有返回值的，仅仅是遍历数组中的每一项，不对原来数组进行修改；但是可以自己通过数组的索引来修改原来的数组；
 
复制代码
 
var arr = [12,23,24,42,1];
var res = arr.forEach(function (item,index,input) {
     input[index] = item*10;
})
console.log(res);//-->undefined;
console.log(ary);//-->[120,230,240,420,10]; 通过数组索引改变了原数组
 
复制代码
 

arr[].map(function(value,index,array){

　　//do something

})

参数：value数组中的当前项,index当前项的索引,array原始数组；
区别：map的回调函数中支持return返回值；return的是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份的数组中的对应项改变了）；
 
复制代码

var arr = [12,23,24,42,1];
var res = arr.map(function (item,index,input) {
     return item*10;
})
console.log(res);//-->[120,230,240,420,10]; 原数组拷贝了一份，并进行了修改
console.log(ary);//-->[12,23,24,42,1]; 原数组并未发生变化
 
复制代码
 

$.each(arr, function(index,value){

　　//do something

})

参数：arr要遍历的数组,index当前项的索引,value数组中的当前项
第1个和第2个参数正好和以上两个函数是相反的，注意不要记错了
  

复制代码
 
var arr = [12,23,24,42,1];
$.each(arr, function (index,item) {
     console.log(index) // 0 1 2 3 4
     console.log(item) // 12 23 24 42 1
})
 
复制代码
 

参考：
http://www.jb51.net/article/81955.htm
http://www.cnblogs.com/jocyci/p/5508279.html
　　
```
