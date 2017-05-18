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