'use strict';

angular.module('app',['ui.router','ngCookies']);
// 'use strict';
// angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
// 	$http.get('data/city.json').then(function(resp){
// 		dict.city = resp.data;
// 		// console.log('dict.city====='+dict.city);
// 	});
// 	$http.get('data/salary.json').then(function(resp){
// 		dict.salary = resp.data;
// 		// console.log('dict.salary====='+dict.salary);
// 	});
// 	$http.get('data/amount.json').then(function(resp){
// 		dict.amount = resp.data;		
// 		// console.log('dict.amount====='+dict.amount);
// 	});
// }])
'use strict';
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
	$http.get('data/city.json').then(function(resp){
		dict.city = resp.data;
	});
	$http.get('data/salary.json').then(function(resp){
		dict.salary = resp.data;
	});
	$http.get('data/amount.json').then(function(resp){
		dict.amount = resp.data;
	});

}])
'use strict';
angular.module('app').config(['$stateProvider','$urlRouterProvider',function($stateProvider,$urlRouterProvider){
	$stateProvider.state('main',{
		url:'/main',
		templateUrl:'view/main.html',
		controller:'mainCtrl'
	}).state('search',{ 
		url:'/search/:id',
		templateUrl:'view/search.html',
		controller:'searchCtrl'
	}).state('me',{ 
		url:'/me',
		templateUrl:'view/me.html',
		controller:'meCtrl'
	}).state('grLogin',{ 
		url:'/grLogin',
		templateUrl:'view/template/grLogin.html',
		controller:'grLoginCtrl'
	}).state('qyLogin',{ 
		url:'/qyLogin',
		templateUrl:'view/template/qyLogin.html',
		controller:'qyLoginCtrl'
	}).state('grRegister',{ 
		url:'/grRegister',
		templateUrl:'view/template/grRegister.html',
		controller:'grRegisterCtrl'
	}).state('qyRegister',{ 
		url:'/qyRegister',
		templateUrl:'view/template/qyRegister.html',
		controller:'qyRegisterCtrl'
	}).state('position',{ 
		url:'/position/:id',
		templateUrl:'view/template/position.html',
		controller:'positionCtrl'
	}).state('favorite',{ 
		url:'/position',
		templateUrl:'view/template/favorite.html',
		controller:'favoriteCtrl'
	}).state('post',{ 
		url:'/post',
		templateUrl:'view/template/post.html',
		controller:'postCtrl'
	});
	$urlRouterProvider.otherwise('main');	
}])
'use strict';
angular.module('app').controller('favoriteCtrl', ['$http','$scope','cache', function($http,$scope,cache){
	// $scope.uid = cache.get('uid');
	// $http.get('http://127.0.0.1:8080/lgw/col/loadData/'+$scope.uid).then(function(resp){
	// 	$scope.list1 = resp.data;
	// })
	// console.log(cache.get('uid'));
	$scope.tabList =[{
		id:'all',
		name:'全部'
	},{
		id:'pass',
		name:'面试邀请'
	},{
		id:'fail',
		name:'不合适'
	}];
	$scope.uid = cache.get('uid');
	$http.get('http://127.0.0.1:8080/lgw/apply/loadData/'+$scope.uid+'/'+'new').then(function(resp){
		$scope.list1 = resp.data.data;
		console.log(resp.data)
	});

	$scope.filterObj = {};

	
	$scope.tClick = function(id,name){
		switch (id) { 
			case 'all':
				delete $scope.filterObj.state;
				break;		
			case 'pass':
				$scope.filterObj.state = "1";
				break;	
			case 'fail':
				$scope.filterObj.state = "-1";
				break;
			default:
		}
	}	
}])
'use strict';
angular.module('app').controller('grLoginCtrl', ['$http','$scope','$state','cache', function($http,$scope,$state,cache){
	$scope.submit = function(){
		$http({
			method: 'GET',
			params:{
				username : $scope.user.phone,
				password : $scope.user.pwd
			},
			url : 'http://127.0.0.1:8080/lgw/user/login',
		}).then(function success(response){
			console.log(response.data.message);
			console.log(response.data.data.username);
			if(response.data.message == '登录成功'){
				cache.put('name',response.data.data.username);
				cache.put('uid',response.data.data.id);
				$state.go('main');
			}
		},function error(response){

		})
	}
	$scope.submitcompany = function(){
		$http({
			method: 'GET',
			params:{
				username : $scope.user.phone,
				password : $scope.user.pwd
			},
			url : 'http://127.0.0.1:8080/lgw/company/login',
		}).then(function success(response){
			console.log(response.data.message);
			console.log(response.data.data.username);
			if(response.data.message == '登录成功'){
				cache.put('name',response.data.data.username);
				cache.put('uid',response.data.data.id);
				$state.go('main');
			}
		},function error(response){

		})
	}        
}]) 
'use strict';
angular.module('app').controller('grRegisterCtrl', ['$http','$scope','$state', function($http,$scope,$state){
	$scope.send = function(){
		$http({
			method:'GET',
			params:{
				username:$scope.user.phone,
				password:$scope.user.pwd
			},
			url:'http://127.0.0.1:8080/lgw/user/loadValidCode'
		}).then(function success(response){
			console.log(response.data.message);
			if(response.data.message == '成功'){
				$scope.id = response.data.data.id;
				$scope.validcode = response.data.data.code;
			}
		},function error(response){

		})
	}
	
	$scope.submit = function(){
		// console.log('code'+$scope.validcode);
		// console.log('id'+$scope.id);
		$http({
			method:'GET',
			params:{
				validcode:$scope.validcode,
				id:$scope.id
			},
			url:'http://127.0.0.1:8080/lgw/user/regist'
		}).then(function success(response){
			console.log(response.data.message);
			if(response.data.message == '注册成功'){
				$state.go('grLogin');
				console.log('登录页面');
			}else{
				console.log('注册失败');
			}
		},function error(response){
			
		})
	}
}]) 
'use strict';
angular.module('app').controller('mainCtrl', ['$http','$scope', function($http,$scope){
        $http({
            method: 'GET',
            params: {
            },
            url: 'http://127.0.0.1:8080/lgw/advis/query',
        }).then(function successCallback(res) {
            console.log(res.data);
            	$scope.list1 = res.data.data;
        }, function errorCallback(response) {
            console.log('wrong');

        });
}]) 
'use strict';
angular.module('app').controller('meCtrl', ['cache','$scope','$state', function(cache,$scope,$state){
        if(cache.get('name')){
                $scope.name = cache.get('name');
        }
        $scope.logout = function(){
                cache.remove('name');
                $state.reload();
        }
        console.log($scope.name);
}]) 
'use strict';
angular.module('app').controller('meLoginCtrl', ['$http','$scope', function($http,$scope){
        
}]) 
'use strict';
angular.module('app').controller('positionCtrl', ['$scope','$http','$state','cache', function($scope,$http,$state,cache){
    $scope.isLogin = cache.get('name');
    $scope.name = cache.get('name');
    $scope.uid = cache.get('name') ? cache.get('uid') : -1;
    $scope.message = $scope.name ? '投个简历' : '请先登录';
    console.log($scope.name);
    console.log($scope.uid);
    console.log($scope.message);

    $http.get('http://127.0.0.1:8080/lgw/advis/loadDetail/'+$state.params.id+'/'+$scope.uid)
        .then(function success(response){
            $scope.position = response.data.data;
            console.log($scope.position);
            $scope.fa = response.data.hasCol;
            $scope.imagePath = $scope.fa ? 'image/star-active.png':'image/star.png';
        },function error(response){

    })

    $scope.favorite = function(){
        if ( $scope.fa ) {
            $http.get("http://127.0.0.1:8080/lgw/col/delCol/"+$scope.fa.id).then(function(resp){
                alert( resp.data.message )
                $state.reload();
            })
            return;
        }
        $http.get("http://127.0.0.1:8080/lgw/col/add?"+'&userid='+$scope.uid+'&advertiesid='+$state.params.id).then(function(resp){
                alert( resp.data.message );
                $state.reload();
        })
    }

    $scope.go = function(){
        if($scope.name){
            $http.get("http://127.0.0.1:8080/lgw/apply/add?"+'&userid='+$scope.uid+'&advertiesid='+$state.params.id).then(function(resp){
                if(resp.data.message = '投递成功');
                $scope.message = '已投递'
            })
        }else{
            $state.go('login');
        }
    }
}]) 
'use strict';
angular.module('app').controller('postCtrl', ['$http','$scope','cache', function($http,$scope,cache){
	console.log(cache.get('uid'));
	$scope.tabList =[{
		id:'all',
		name:'全部'
	},{
		id:'pass',
		name:'面试邀请'
	},{
		id:'fail',
		name:'不合适'
	}];
	$scope.uid = cache.get('uid');
	$http.get('http://127.0.0.1:8080/lgw/apply/loadData/'+$scope.uid+'/'+'new').then(function(resp){
		$scope.list1 = resp.data.data;
		console.log(resp.data)
	});

	$scope.filterObj = {};

	
	$scope.tClick = function(id,name){
		switch (id) { 
			case 'all':
				delete $scope.filterObj.state;
				break;		
			case 'pass':
				$scope.filterObj.state = "1";
				break;	
			case 'fail':
				$scope.filterObj.state = "-1";
				break;
			default:
		}
	}
}])
'use strict';
angular.module('app').controller('qyLoginCtrl', ['$http','$scope', function($http,$scope){
        
}]) 
'use strict';
angular.module('app').controller('qyRegisterCtrl', ['$http','$scope', function($http,$scope){
	$scope.send = function(){
		$http({
			method:'GET',
			params:{
				companyname:$scope.user.companyname,
				username:$scope.user.phone,
				password:$scope.user.pwd,
				empnum:$scope.user.num
			},
			url:'http://127.0.0.1:8080/lgw/company/loadValidCode'
		}).then(function success(response){
			console.log(response.data.message);
			if(response.data.message == '成功'){
				$scope.id = response.data.data.id;
				$scope.validcode = response.data.data.code;
			}
		},function error(response){

		})
	}
	
	$scope.submit = function(){
		// console.log('code'+$scope.validcode);
		// console.log('id'+$scope.id);
		$http({
			method:'GET',
			params:{
				validcode:$scope.validcode,
				id:$scope.id
			},
			url:'http://127.0.0.1:8080/lgw/company/regist'
		}).then(function success(response){
			console.log(response.data.message);
			if(response.data.message == '注册成功'){
				$state.go('grLogin');
				console.log('登录页面');
			}else{
				console.log('注册失败');
			}
		},function error(response){
			
		})
	}        
}]) 
'use strict';
angular.module('app').controller('searchCtrl', ['$http','$scope','dict','$state', function($http,$scope,dict,$state){
        $scope.search = function(){
            $http({
                method: 'GET',
                params: {
                },
                url: 'http://127.0.0.1:8080/lgw/advis/query',
            }).then(function successCallback(res) {
                console.log(res.data);
                    $scope.list1 = res.data.data;
            }, function errorCallback(response) {
                console.log('wrong');

            });            
        }
        $scope.search();

        $scope.name = '';
        $scope.sheet = {};

        $scope.tabList = [
        {
            id:'city',
            name:'城市'
        },{
            id:'salary',
            name:'薪水'
        },{
            id:'amount',
            name:'公司规模'
        }];

        var tabId = '';

        $scope.tClick = function(id,name){
            tabId = id;
            $scope.sheet.list = dict[id];
            $scope.sheet.visible = true;
            console.log('$scope.sheet.list'+$scope.sheet.list);
            console.log(tabId);
        }

        // 筛选 
        $scope.sClick = function(id,name){
        // $scope.tClick();
        if(id){
            angular.forEach($scope.tabList, function(item){
                if( item.id === tabId ){
                    item.name = name;
                    $http.post('http://127.0.0.1:8080/lgw/advis/query?'+item.id+'='+item.name).then(function(resp){
                        console.log(resp.data);
                        $scope.list1 = resp.data.data;
                        
                    });

                }
                // if(1){
                //     $scope.search();
                // }
            });
            // $scope.filterObj[tabId + 'Id'] = id;
            // $scope.filterObj[tabId + 'Id'] = id;
            
        }else{
            // delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList, function(item){
                if( item.id === tabId ){
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';               
                        break;
                        case 'salary':
                            item.name = '薪水';               
                        break;
                        case 'amount':
                            item.name = '公司规模';             
                        break;
                        default:
                    }
                }
            })
        }
    }

}]);

'use strict';
angular.module('app').directive('appFoot',function(){
	return {
		restrict:'A',
		replace:true,
		templateUrl:'view/template/foot.html',
	}
})
'use strict';
angular.module('app').directive('footBar',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/footbar.html'
	}
});
'use strict';
angular.module('app').directive('appHead',['cache',function(cache){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/head.html',
		link:function($scope){
			$scope.name = cache.get('name') || "";
		}
	}
}]);
'use strict';
angular.module('app').directive('headBar',['cache',function(cache){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/headbar.html',
		scope:{
			text : '@'
		},
		link:function($scope){
			$scope.back = function(){
				window.history.back();
			}
			$scope.name = cache.get('name');
		}
	}
}]);
'use strict';
angular.module('app').directive('appPositionList',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/mainList.html'
	}
});
'use strict';
angular.module('app').directive('meLogin',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/meLogin.html'
	}
});
'use strict';
angular.module('app').directive('positionList',['$http','cache',function($http,cache){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionlist.html',
		// scope:{
		// 	data : ' = ',
		// 	isFavorite: '='
		// },
		link:function($scope){
			// $scope.select = function(item){
			// 	$http.get('data/favorite.json',{
			// 		id: item.id,
			// 		select:!item.select
			// 	}).then(function(){
			// 		item.select = !item.select;
			// 	});
			// };
		}
	}
}]);
'use strict';
angular.module('app').directive('searchBar',function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			list:'=',
			tabClick:'&'
		},
		templateUrl:'view/template/searchbar.html',
		link:function($scope){
			$scope.click = function(tab) {
				$scope.selectId = tab.id;
				$scope.selectName = tab.name;
				$scope.tabClick(tab);
				// console.log('$scope.selectId===='+$scope.selectId);
				// console.log('$scope.selectName===='+$scope.selectName);
			};
		}
	}
});
'use strict';
angular.module('app').directive('searchHead',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/searchhead.html'
	}
});
'use strict';
angular.module('app').directive('appSheet',function(){
	return{
		restrict:'A',
		replace:true,
		scope:{
			list:'=',
			visible:'=',
			select:'&'
		},
		templateUrl:'view/template/sheet.html'
	}
});
angular.module('app').filter('mf',function() {
	return function(value){
		return value.split(" ")[0];
	}
});
'use strict';
angular.module('app').service('cache',['$cookies',function($cookies){
    this.put = function(key,value){
        $cookies.put(key,value);
    }
    this.get = function(key){
        return $cookies.get(key);
    }
    this.remove = function(key){
        $cookies.remove(key);
    }
}])