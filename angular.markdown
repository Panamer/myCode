##### angular往当前dom后追加节点
angular.element($event.target).parent().after( $compile
    插入dom节点以后,需要手动调用 $compile 服务(调用前先依赖注入) 才能将 angular.js 指令和模型绑定生效.类似如下代码:
    
        $('div[name=father]').html(
          $compile('<input type="text" ng-model="person.name" /> <input type="input" ng-model="person.age" value="{{person.age}}" /><a ng-show="$index!=0" style="color:red;" ng-click="del($index)">移除</a>'
          )(scope)
        );


- AngularJS操作DOM——angular.element
- addClass()-为每个匹配的元素添加指定的样式类名
- after()-在匹配元素集合中的每个元素后面插入参数所指定的内容，作为其兄弟节点
- append()-在每个匹配元素里面的末尾处插入参数内容
- attr() - 获取匹配的元素集合中的第一个元素的属性的值
- bind() - 为一个元素绑定一个事件处理程序
- children() - 获得匹配元素集合中每个元素的子元素，选择器选择性筛选
- clone()-创建一个匹配的元素集合的深度拷贝副本
- contents()-获得匹配元素集合中每个元素的子元素，包括文字和注释节点
- css() - 获取匹配元素集合中的第一个元素的样式属性的值
- data()-在匹配元素上存储任意相关数据
- detach()-从DOM中去掉所有匹配的元素
- empty()-从DOM中移除集合中匹配元素的所有子节点
- eq()-减少匹配元素的集合为指定的索引的哪一个元素
- find() - 通过一个选择器，jQuery对象，或元素过滤，得到当前匹配的元素集合中每个元素的后代
- hasClass()-确定任何一个匹配元素是否有被分配给定的（样式）类
- html()-获取集合中第一个匹配元素的HTML内容
- next() - 取得匹配的元素集合中每一个元素紧邻的后面同辈元素的元素集合。如果提供一个选择器，那么只有紧跟着的兄弟元素满足选择器时，才会返回此元素
- on() - 在选定的元素上绑定一个或多个事件处理函数
- off() - 移除一个事件处理函数
- one() - 为元素的事件添加处理函数。处理函数在每个元素上每种事件类型最多执行一次
- parent() - 取得匹配元素集合中，每个元素的父元素，可以提供一个可选的选择器
- prepend()-将参数内容插入到每个匹配元素的前面（元素内部）
- prop()-获取匹配的元素集中第一个元素的属性（property）值
- ready()-当DOM准备就绪时，指定一个函数来执行
- remove()-将匹配元素集合从DOM中删除。（同时移除元素上的事件及 jQuery 数据。）
- removeAttr()-为匹配的元素集合中的每个元素中移除一个属性（attribute）
- removeClass()-移除集合中每个匹配元素上一个，多个或全部样式
- removeData()-在元素上移除绑定的数据
- replaceWith()-用提供的内容替换集合中所有匹配的元素并且返回被删除元素的集合
- text()-得到匹配元素集合中每个元素的合并文本，包括他们的后代
- toggleClass()-在匹配的元素集合中的每个元素上添加或删除一个或多个样式类,取决于这个样式类是否存在或值切换属性。即：如果存在（不存在）就删除（添加）一个类
- triggerHandler() -为一个事件执行附加到元素的所有处理程序
- unbind() - 从元素上删除一个以前附加事件处理程序
- val()-获取匹配的元素集合中第一个元素的当前值
- wrap()-在每个匹配的元素外层包上一个html元素
- 
##### 前置接口

```<div ng-show="params.build_type.name === 'interface_auto_trigger'" class="form-group jobCon" style="position: relative;z-index:2;">
                            <label for="departmentDes" class="col-sm-2 control-label">前置接口</label>
                            <div class="col-sm-10" >
                                <div ui-sortable="sortableOptions" class=" selectSearchResult" ng-model="selectSearchResult">
                                    <div ng-repeat="item in selectSearchResult " class="selectSearchResultItem pull-left" >
                                        <span class = "deleteSelected" ng-click="selectSearchResult.splice($index,1)" ng-show="!dialog.input_isClick" >x</span>
                                        <span>{{item.name}}</span>
                                    </div>
                                </div>
                                <div style="position:relative;" ng-show="!dialog.input_isClick">
                                    <!--&lt;!&ndash; <label for="departmentDes" class="control-label">搜索</label> &ndash;&gt;-->
                                    <input  type="text" ng-model="searchWord" placeholder="输入检索信息进行搜索" class="form-control" ng-focus = "searchResultIsShow = true" >
                                    <div class="searchResult" ng-show="searchResultIsShow && searchResultFlag === true">
                                        <div ng-repeat="m in searchResult" ng-click="selectSearchItem($index)" class="searchResultItem">{{m.name}}</div>
                                    </div>
                                    <div ng-show="searchResultIsShow && searchResultFlag === true" ng-click="searchResultIsShow = false" class="closeSearchResult">点击关闭</div>
                                </div>

                            </div>
                        </div>

```

```
$scope.$watch('searchWord', function () {
        // console.log($scope.searchWord);
        // 检索词为空，返回； 若果加载页面，会执行一次，此时$scope.stepList尚未获取到，for循环的时候会报错；
        //$scope.searchResultIsShow = true;
        // 临时保存数组
        var tempArr = [];
        for (var i = 0; i < $scope.stepList.length; i++) {
            if ($scope.stepList[i].name.indexOf($scope.searchWord) > -1) {
                tempArr.push($scope.stepList[i]);
            }
        }
        // 更改搜索结果的数组数据，更新页面；
        $scope.searchResult = tempArr;
    });
```



#### $http只能解析服务器上的数据，本地不行


angular controller 里调用接口函数里返回数据在view里通过函数渲染会造成死循环
可以通过加锁解决 或者改变执行顺序在初始化函数里加载

    <select class="seleted-work" ng-model="selected_class" ng-options="one.coursename for one in classesArr" ng-change="getPictorial(selected_class)">
    			<option value="">-- 请选择 --</option>
    		</select>

这种写法model绑定的就是== one    但是拿不到select的值     可以采用原生的写法ng-repeat option 线上说法是  ng-options指令仅仅设置了下拉框选项的text，而不是value
http://blog.csdn.net/zhouyingge1104/article/details/50577931	
经过测试可以拿到select的值不能用rootscope直接绑定要用scope//貌似和rootscope没关系就是scope绑定model拿到的是对象不是值

angular.bootstrap(document, ['app']);

 手动初始化angular。
这个函数会自动检测创建的module有没有被加载多次，如果有则会在浏览器的控制台打出警告日志，并且不会再次加载。这样可以避免在程序运行过程中许多奇怪的问题发生。

    $scope.video_dom = '';
    if (response.data.video_url) {
      $scope.video_dom = $sce.trustAsHtml('<video src="' + response.data.video_url + '" preload="auto" controls width="100%" webkit-playsinline></video>');
    }
    关于使用ng-if  ng-show  闪烁问题
    https://my.oschina.net/tanweijie/blog/295255
    他特么神奇了  ng-cloak
    
    
$modal是一个可以迅速创建模态窗口的服务，创建部分页，控制器，并关联他们。
$modal仅有一个方法open(options)，可以使用的选项如下:
templateUrl：模态窗口的地址
template：用于显示html标签
scope：一个作用域为模态的内容使用（事实上，$modal会创建一个当前作用域的子作用域）默认为$rootScope
controller：为$modal指定的控制器，初始化$scope，该控制器可用$modalInstance注入
resolve：定义一个成员并将他传递给$modal指定的控制器，相当于routes的一个reslove属性，如果需要传递一个objec对象，需要使用angular.copy()
backdrop：控制背景，允许的值：true（默认），false（无背景），“static” - 背景是存在的，但点击模态窗口之外时，模态窗口不关闭
keyboard：当按下Esc时，模态对话框是否关闭，默认为ture
windowClass：指定一个class并被添加到模态窗口中
open方法返回一个模态实例，该实例有如下属性
close(result)：关闭模态窗口并传递一个结果
dismiss(reason)：撤销模态方法并传递一个原因
result：一个契约，当模态窗口被关闭或撤销时传递
opened：一个契约，当模态窗口打开并且加载完内容时传递的变量
另外，$modalInstance扩展了两个方法$close(result)、$dismiss(reason)，这些方法很容易关闭窗口并且不需要额外的控制器

        angular.module('ui.bootstrap.demo', ['ngAnimate', 'ui.bootstrap']);
        //必须要引入的模块有两个ngAnimate\ui.bootstrap,一个都不能少,必须在这个模板加载的时候引入
        angular.module('ui.bootstrap.demo').controller('ModalDemoCtrl', function ($scope, $uibModal, $log) {
        //然后就是主控制器,没什么,注意$uibModal这个东西,也是要在控制器中引入的
          $scope.items = ['item1', 'item2', 'item3'];
        
          $scope.animationsEnabled = true;
        
          $scope.open = function (size) {
            //这里很关键,是打开模态框的过程
            var modalInstance = $uibModal.open({
              animation: $scope.animationsEnabled,//打开时的动画开关
              templateUrl: 'myModalContent.html',//模态框的页面内容,这里的url是可以自己定义的,也就意味着什么都可以写
              controller: 'ModalInstanceCtrl',//这是模态框的控制器,是用来控制模态框的
              size: size,//模态框的大小尺寸
              resolve: {//这是一个入参,这个很重要,它可以把主控制器中的参数传到模态框控制器中
                items: function () {//items是一个回调函数
                  return $scope.items;//这个值会被模态框的控制器获取到
                }
              }
            });
        
            modalInstance.result.then(function (selectedItem) {//这是一个接收模态框返回值的函数
              $scope.selected = selectedItem;//模态框的返回值
            }, function () {
              $log.info('Modal dismissed at: ' + new Date());
            });
          };
        
          $scope.toggleAnimation = function () {
            $scope.animationsEnabled = !$scope.animationsEnabled;//动画效果
          };
        
        });
        
        // Please note that $uibModalInstance represents a modal window (instance) dependency.
        // It is not the same as the $uibModal service used above.
        
        angular.module('ui.bootstrap.demo').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
        //这是模态框的控制器,记住$uibModalInstance这个是用来调用函数将模态框内的数据传到外层控制器中的,items则上面所说的入参函数,它可以获取到外层主控制器的参数
          $scope.items = items;//这里就可以去外层主控制器的数据了
          $scope.selected = {
            item: $scope.items[0]
          };
        
          $scope.ok = function () {
            //close函数是在模态框关闭后调用的函数,他会将这个参数传到主控制器的results函数中,作为回调值
            $uibModalInstance.close($scope.selected.item);
          };
        
          $scope.cancel = function () {
            //dismiss也是在模态框关闭的时候进行调用,而它返回的是一个reason
            $uibModalInstance.dismiss('cancel');
          };
$http post 和 get  区别

    unemphasize: function(id) {
            return $http.post(API.customer.unemphasize(), {
                id: id
            });
        },
        getInfo: function(id) {
            return $http.get(API.customer.info(), {
                params: {
                    client_id: id
                }
            });
            },
##     ++++++post请求的方法2种++++++
1.     var data = {
			status		: $scope.params.status ,
			grade		: $scope.params.grade,
			teamname	: $scope.params.teamname ,
			introduce	: $scope.params.introduce,
			ID			: $rootScope.tid,
			user_id		: $rootScope.login_info.userid
		};
		//将参数传递的方式改成form
		postCfg = {
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			transformRequest: function (data) {
			return $.param(data);
			}
		};
		$http.post($scope.api_group_create, data, postCfg)
		.then(function(resp) {
			$scope.dialog_show = false;
			$scope.datainfo.introduce = $scope.params.introduce;
            alert("设置成功");
        }, function(err) {
           alert("网络错误,刷新重试！");
        }).finally(function(){    })
        
        
        
        $.post($scope.api_group_create,{
			status		: $scope.params.status ,
			grade		: $scope.params.grade,
			teamname	: $scope.params.teamname ,
			introduce	: $scope.params.introduce,
			ID			: $rootScope.tid,
			user_id		: $rootScope.login_info.userid
		},function (resp){
			$scope.dialog_show = false;
			$scope.datainfo = $scope.params;
			$scope.$apply();
			alert('设置成功');
		},"json").fail(function(){
			alert("网络错误,刷新重试！");
		})
#####          优雅写法
    	$http({
                 url		: $scope.api_group_create,
                 method		: 'post',
                 params		: {
    							status		: $scope.params.status ,
    							grade		: $scope.params.grade,
    							teamname	: $scope.params.teamname ,
    							introduce	: $scope.params.introduce,
    							ID			: $rootScope.tid,
    							user_id		: $rootScope.login_info.userid
    						}
                }).success(function(data){
                	alert(ok);
                })
##### 设置父路由不可点,其他用法未知

    .state('app', {
            url: "/app",  
            abstract:true,  
            templateUrl: "viewport.html",
        })  


##### Angular.js中使用$watch监听模型变化

$watch简单使用

$watch是一个scope函数，用于监听模型变化，当你的模型部分发生变化时它会通知你。



$watch(watchExpression, listener, objectEquality);

每个参数的说明如下：

watchExpression：监听的对象，它可以是一个angular表达式如'name',或函数如function(){return $scope.name}。

listener:当watchExpression变化时会被调用的函数或者表达式,它接收3个参数：newValue(新值), oldValue(旧值), scope(作用域的引用)

objectEquality：是否深度监听，如果设置为true,它告诉Angular检查所监控的对象中每一个属性的变化. 如果你希望监控数组的个别元素或者对象的属性而不是一个普通的值, 那么你应该使用它



举个栗子：

$scope.name = 'hello';

var watch = $scope.$watch('name',function(newValue,oldValue, scope){

        console.log(newValue);

        console.log(oldValue);

});

$timeout(function(){

        $scope.name = "world";

},1000);        

##### 注意:在onint函数之前js被拦截导致 onint不执行

##### ng-if    有坑以后不用   click事件尽量写成函数


angularJS实用的开发技巧

一、开端

真的是忙完这一阵子就可以忙下一阵子了啊。。。

最近在做一个angularJS+Ionic的移动端项目。。。记录一些技巧，方便自己以后查阅，也方便需要的人可以看一看...^_^

二、基础原则了解

①angular的一些入门了解

一、基础知识
1.angular放弃了IE8
2.四大核心分别是mvc、模块化、指令系统、双向数据绑定
 
二、一些原则
1.不要复用controller，一个控制器一般只负责一小块视图。
2.不要在controller里面操作dom。
3.不要在contorller里面做数据格式化，ng有很好的表单控件。
4.不要在controller里面做数据过滤操作，有$filter服务。
5.一般情况下，controller是不会互相调用的，控制器之间的交互会通过事件进行。
6.angular利用指令来复用view。
7.$scope是一个树型结构，与DOM标签平行。
8.子$scope对象会继承父$scope上的属性和方法。
9.每一个angular应用只有一个$rootScope对象。（一般位于ng-app上）。
10.可以用angular.element($0).scope()进行调试。
11.使用ngRoute进行视图之间的路由。


 

 三、HTML页面最常用且实用的angular内置指令

①.ng-class（适用于类似点赞、关注等某个样式会因为某个操作改变的情况）

ng-class 指令用于给 HTML 元素动态绑定一个或多个 CSS 类。ng-class 指令的值可以是字符串，对象，或一个数组。

如果是字符串，多个类名使用空格分隔。

如果是对象，需要使用 key-value 对，key 是一个布尔值，value 为你想要添加的类名。只有在 key 为 true 时类才会被添加。

如果是数组，可以由字符串或对象组合组成，数组的元素可以是字符串或对象。

建议的两种使用方式：

一、字符串形式，代码如下：

1
2
<i class="icon" ng-class="{true:'ion-ios-heart',false:'ion-ios-heart-outline'}[AccountInfo.isFocus]" ng-click='wetherFocus()'>
</i>
这样的意思就是，i标签有一个基础类为icon,ng-class则绑定了一个动态的类，而这个类要取哪一个值则由AccountInfo.isFocus的值是true或者false来决定，若其值为true则i标签会添加ion-ios-heart这个类，若其值为false则i标签会添加ion-ios-heart-outline

这个类。i标签还绑定了一个ng-click的事件，在这个事件里面除了处理相应的逻辑之外，还决定AccountInfo.isFocus的值。这样的话，当发生点击操作的时候，自然就改变i标签相应的类，继而表现出不同的样式了。

二、key-value的样式，代码如下：

1
<i class="icon" ng-class="{'ion-ios-heart':isIos,'ion-android-heart':isAndroid}"> </i>
显然，由代码则可以看出，这样的含义就是当isIos为true的时候就会取ion-ios-heart这个类，当isAndroid的值为true的时候，就会取ion-android-heart这个类。

②.ng-show和ng-hide(适用于对于不同的情况显示两种不同的内容时)　

ng-show 指令在表达式为 true 时显示指定的 HTML 元素，否则隐藏指定的 HTML 元素。

ng-hide  指令在表达式为 true 时隐藏指定的 HTML 元素，否则显示指定的 HTML 元素。

哈哈，看着就是水火不容的兄弟。。。。

例子如下：

1
2
3
4
5
6
7
8
9
10
<div class="keyboard">
       <span class="keyboardIcon" ng-click="toggleMenu()"></span>
</div>
<div class="footer-menu">
     <ul class="menu-list" ng-show="menuState">
       ...
     </ul>
<div class="footer-send" ng-hide="menuState">
         ...
</div>
 设置一个布尔变量menuState（实际开发中你可以用表达式，三目运算式等等），当其为true的时候，ng-show的内容会显示，ng-hide的内容会隐藏。反之则反之。。。

③.ng-switch(适用于在多种情况下显示不同的内容时)

ng-switch 指令根据表达式显示或隐藏对应的部分。

对应的子元素使用 ng-switch-when 指令，如果匹配选中选择显示，其他为匹配的则移除。

通过使用 ng-switch-default 指令设置默认选项，如果都没有匹配的情况，默认选项会显示。

例子：

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
  <div ng-switch="essayType">
          <div class="list-cart" ng-switch-when="4">
           ....
          </div>
          <div class="list-cart left-pic" ng-switch-when="3">
              ....
          </div>
          <div class="single-pic" ng-switch-when="1">
              ...
          </div>
          <div class="single-pic" ng-switch-when="2">
                ...
          </div>
          <div class="single-pic" ng-switch-default>
              ...
          </div>
</div>
④.ng-model(这里主要说一下ng-model神奇的小坑坑)

ng-model 指令绑定了 HTML 表单元素到 scope 变量中。

如果 scope 中不存在变量, 将会创建它。ng-model常用于<input>, <select>, <textarea>等元素。

如下代码：

1
2
3
4
<div class="WhatISay">
    <textarea name="my-massage-detail" ng-model="content" class="my-massage-detail" placeholder="请输入留言">
    </textarea>
    <a class="button btn"ng-click="submitMes()">提交</a><br></div>　　
按照定义，理论上来说我们提交的时候，直接在controller里面获取在页面定义了的ng-model的值，是可以的。但是实际上这样是不可行的。亲测发现输出了一个undefined，而且，如果在controller里面定义ng-model的初始值的话，获取到的就是初始值而不是改变后的最新值。

查找了一些资料，大概意思就是说。angular限制了我们的一些定义。我们只能使用一个非原始的对象来传递参数。

什么意思呢。稍微改一下上面的例子，如下：

html代码：

1
2
3
4
5
<div class="WhatISay">
    <textarea name="my-massage-detail" ng-model="model.content" class="my-massage-detail" placeholder="请输入留言">
    </textarea>
    <a class="button btn"ng-click="submitMes()">提交</a>
</div>
controller代码：

1
2
3
4
5
6
$scope.model = {};
$scope.model.content = '';
 
$scope.submitMes=function(){
   console.log($scope.model.content);
}
就是我们是定义了一个对象，然后把ng-model定义为这个对象里面的一个属性这样来处理的。这样子，我们就得到了ng-model的最新值了。

还有一种比较简单的方式就是直接把ng-model作为参数传进去就好了。

例子如下：

1
2
3
4
5
6
7
//HTML代码
<input type="text" ng-model="code">
<button ng-click="setCode(code)">Login</button><br>
//controller代码
$scope.setCode = function(code){
    alert(code);
  }
四、数据交互实用技巧

①Promise的利用

ES6定义了Promise对象。这个对象挺好用的，特别是用在与后台交互的时候。既预防回调过深，又可以针对一些情况做统一处理，还提高了代码的可读性。在angularJs里面也封装了这样一个服务，就是$q。

$q是做为angularjs的一个服务而存在的，只是对promise异步编程模式的一个简化实现版。defer对象(延迟对象)可以通$q.defer()获取，该对象有三个方法:

     resolve(value):向promise对象异步执行体发送消息告诉他我已经成功完成任务，value即为发送的消息。

     reject(value): 向promise对象异步执行体发送消息告诉他我已经不可能完成这个任务了，value即为发送的消息。

     notify(value): 向promise对象异步执行体发送消息告诉他我现在任务完成的情况，value即为发送的消息。

　　这些消息发送完promise会调用现有的回调函数。

promise即与这个defer对象的承诺对象。promise对象可以通过defer.promise获取,promise对象的一些方法：

　　then(successCallback,errorCallback,notifyCallback):参数为不同消息下的不同回调函数，defer发送不同的消息执行不同的回调函数，消息作为这些回调函数的参数传递。返回值为回一个promise对象为支持链式调用而存在。当第一个defer对象发送消         息后，后面的promise对应的defer对象也会发送消息，但是发送的消息不一样，不管第一个defer对象发送的是reject还是resolve，第二个及其以后的都是发送的resolve，消息是可传递的。

　　catch(errorCallback):then(null,errorCallback)的缩写。

　　finally(callback):相当于then(callback,callback)的缩写，这个finally中的方法不接受参数，却可以将defer发送的消息和消息类型成功传递到下一个then中。

　　defer():用来生成一个延迟对象 var defer =$q.defer();

　　reject():参数接收错误消息，相当于在回调函数中抛出一个异常，然后在下一个then中调用错误的回调函数。

　  all()：参数接收为一个promise数组，返回一个新的单一promise对象，当这些promise对象对应defer对象全部解决这个单一promise对象才会解决，当这些promise对象中有一个被reject了，这个单一promise同样的被reject了。

　  when():接收第一个参数为一个任意值或者是一个promise对象，其他3个同promise的then方法,返回值为一个promise对象。第一个参数若不是promise对象则直接运行success回调且消息为这个对象，若为promise那么返回的promise其实就是对这个promise      类型的参数的一个包装而已，被传入的这个promise对应的defer发送的消息，会被我们when函数返回的promise对象所接收到。

具体用法如下：

在angular中，定义一个专门用来交互的服务。

 
```
get: function (url, options) {            <br>   var deferred = $q.defer();    <br>   showTip();
        $http.get(url, options).success(function (data) {
           hideTip();
             if (data.Success) {
                 deferred.resolve(data);
             } else {
                deferred.reject(data.Message);
           }
        }).error(function (data) {
           hideTip();
          deferred.reject(data);
          });
        return deferred.promise;
 }
//controller里面的调用
 
get('url',params)
 
.then(function (data) {
 
      //这里是successCallback
    },function (data) {
       //这里是errorCallback
    });
```

　　这样，我们就可以在每个请求发出时统一定义一些提示，然后请求结束之后隐藏这些提示。这段代码中，大概意思就是，当请求成功的时候，就会调用deferred.resolve(data)，把状态设置为成功，这样就会自动执行then里面的第一个函数即successCallback，并把请求到的数据data传递进去。而当请求失败的时候，则会调用第二个函数，即errorCallback。


        