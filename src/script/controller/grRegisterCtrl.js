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