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