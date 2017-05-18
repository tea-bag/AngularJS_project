'use strict';
angular.module('app').directive('footBar',function(){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/footbar.html'
	}
});