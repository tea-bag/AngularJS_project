'use strict';
angular.module('app').directive('searchHead',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/searchhead.html'
	}
});