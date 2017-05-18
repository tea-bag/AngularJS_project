'use strict';
angular.module('app').directive('meLogin',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/meLogin.html'
	}
});