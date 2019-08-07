js获取对象,数组所有属性值(key)和对应值(value)的方法

    keys: function(object) {
        var keys = [];
        for (var property in object)
          keys.push(property);
        return keys;
    },
    
    values: function(object) {
        var values = [];
        for (var property in object)
          values.push(object[property]);
        return values;
    },


    <!DOCTYPE html>
    <html>
    	<head>
    		<meta charset="UTF-8">
    		<title></title>
    	</head>
    	<body>
    	</body>
    </html>
    <script type="text/javascript">
    	var getkey = function(object) {
    	    var keys = [];
    	    for (var property in object)
    	      keys.push(property);
    	    return keys;
    	};
    
        var obj = {
                "good_id": "5692",
                "cat_id": "26",
                "user_id": "57df6073ab4af62105518589",
                "course_id": "0",
                "page_id": "0",
                "good_name": "小小金木研",
                "good_price": "29.00",
                "buy_num": "208",
                "good_num": "1",
                "zan_num": "0",
           };
           console.log(getkey(obj))
    </script>

        document.getElementsByClassName('advertise-righta')[0].appendChild(advertise_righta_div);
    
    原生append方法   要加[0]   并且类名不能写以层级关系的方式   只能写当前类名
    
..

    	$scope.copyUrl = function() {
    		var urltext=document.getElementById("urltext");
    		urltext.select();
    		document.execCommand("Copy");
    //		alert("已复制好，可贴粘。");
    	};
    
#### $ajax结合resetful后端框架    
    初始请求会出现跨域 需要后端中间量加修改..如果后端要的是数组可以{"test":[]}这样传参,后端收到以后遍历得到数组
####     动态创建对象的属性的方法
obj["name"] = username 
#### 在成功函数里可以立即执行另一个函数,在成功函数外要考虑异步的关系

##### forEach

```
var ary = [12,23,24,42,1];
var res = ary.forEach(function (item,index,input) {
     input[index] = item*10;
})
```
##### foreach  return不出来  因为他是函数
```
$scope.accrentgroup.forEach(function(item,index,arr){
        		item.user_list.forEach(function(value,idx,arr){
        			if (value == stu.userid) {
        				return item.teamname;
        			}
        		})
        	})
```
字符串和json的转换
```
str2Json: function (str) {
            if (str && typeof str === 'string') {
                try {
                    return JSON.parse(str);
                } catch (e) {
                    return {
                        status: {
                            code: 1,
                            msg: 'params parse error!'
                        }
                    };
                }
            } else {
                return str || {};
            }
        },
        json2Str: function (param) {
            if (param && typeof param === 'object') {
                return JSON.stringify(param);
            } else {
                return param || '';
            }
        },
```
iOS Android


```
isAndroid: function () {
            var tmp = ua.toLowerCase();
            var android = tmp.indexOf('android') > -1;
            return !!android;
        },
        isIos: function () {
            var tmp = ua.toLowerCase();
            var ios = tmp.indexOf('iphone') > -1;
            return !!ios;
        }
```

```
css把单行超出部分显示为省略号的方法兼容火狐:
li a { 
	display: block;
	 width: 80px; 
	*width:35px;
	  _width:35px;
	overflow: hidden;/*注意不要写在最后了*/
	 white-space: nowrap; 
	-o-text-overflow: ellipsis; 
	text-overflow: ellipsis; 
}
css把多行超出部分显示为省略号的方法兼容火狐:
li a {
	text-overflow: ellipsis;
	display: -webkit-box;
	overflow: hidden;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;（行数）
}
```



```
var data = [{
    name: "李蛋",
    age: 22
  }, {
    name: "虞姬",
    age: 21
  }, {
    name: "兰陵王",
    age: 25
  }];
  //定义一个比较器
  function compare(propertyName) {
    return function(object1, object2) {
      var value1 = object1[propertyName];
      var value2 = object2[propertyName];
      if (value2 < value1) {
        return 1;
      } else if (value2 > value1) {
        return -1;
      } else {
        return 0;
      }
    }
  }
  //使用方法
  data.sort(compare("age"));
  
  
  computed: {
        	orderList: function() {
				let compare = function(idx) {
			    	return function(object1,object2) {
						var a = object1[idx];
						var b = object2[idx];
						if(b < a) {
							return -1;
						} else if(b > a) {
							return 1;
						} else {
							return 0;
						};
					};
				};
				return this.list.sort(compare("crtDate"));
			}
		}
  
  
  
```

```
function allpro(obj){  
    var keys=[];   
    var values=[];    
    for(var key in obj){   
        //只遍历对象自身的属性，而不包含继承于原型链上的属性。  
        if (obj.hasOwnProperty(key) === true){  
            keys.push(key);    
            values.push(obj[key]);   
            }                 
        }  
    alert("keys is ："+keys+" and values is ："+values);    
}  
var o={"name":"wjy","age":26,"sex":"female"};//定义一个object对象   
allpro(o);  
//keys is : name,age,sex and values is: wjy,26,female  
```
还可以再遍历一次
还可以求一个对象的长度

滚动条高度   加载更多

    $(window).scroll(function(event){  
            var sm=$(this).scrollTop()+$(window).height();  
            //$(this).scrollTop():滚动条的滚动高度，不可见的部分  
            //$(window).height():窗口，可见部分的高度  
            var dsm=$(document).height();  
            //$(document).height();整个文档的高度，（可见+不可见）  
              console.log(sm+"-----"+dsm);  
            if(sm==dsm-200){  
                  console.log("到底了---");  
                  
            }  
        })

//点击按键，监听回车键等事件

		_this.methods.pressKey = function(e){
            var keycode = window.event?e.keyCode:e.which;
            //如果点击了回车键，则发布评论
            if(keycode==13){
                _this.methods.release();
            }
    	};

