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