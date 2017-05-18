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