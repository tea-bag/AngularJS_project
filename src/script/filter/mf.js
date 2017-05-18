angular.module('app').filter('mf',function() {
	return function(value){
		return value.split(" ")[0];
	}
});