
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


        