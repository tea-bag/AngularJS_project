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