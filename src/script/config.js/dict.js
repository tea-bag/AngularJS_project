// 'use strict';
// angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
// 	$http.get('data/city.json').then(function(resp){
// 		dict.city = resp.data;
// 		// console.log('dict.city====='+dict.city);
// 	});
// 	$http.get('data/salary.json').then(function(resp){
// 		dict.salary = resp.data;
// 		// console.log('dict.salary====='+dict.salary);
// 	});
// 	$http.get('data/amount.json').then(function(resp){
// 		dict.amount = resp.data;		
// 		// console.log('dict.amount====='+dict.amount);
// 	});
// }])
'use strict';
angular.module('app').value('dict',{}).run(['dict','$http',function(dict,$http){
	$http.get('data/city.json').then(function(resp){
		dict.city = resp.data;
	});
	$http.get('data/salary.json').then(function(resp){
		dict.salary = resp.data;
	});
	$http.get('data/amount.json').then(function(resp){
		dict.amount = resp.data;
	});

}])