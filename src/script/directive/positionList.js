'use strict';
angular.module('app').directive('positionList',['$http','cache',function($http,cache){
	return{
		restrict:'A',
		replace:true,
		templateUrl:'view/template/positionlist.html',
		// scope:{
		// 	data : ' = ',
		// 	isFavorite: '='
		// },
		link:function($scope){
			// $scope.select = function(item){
			// 	$http.get('data/favorite.json',{
			// 		id: item.id,
			// 		select:!item.select
			// 	}).then(function(){
			// 		item.select = !item.select;
			// 	});
			// };
		}
	}
}]);