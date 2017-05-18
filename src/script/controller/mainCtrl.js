'use strict';
angular.module('app').controller('mainCtrl', ['$http','$scope', function($http,$scope){
        $http({
            method: 'GET',
            params: {
            },
            url: 'http://127.0.0.1:8080/lgw/advis/query',
        }).then(function successCallback(res) {
            console.log(res.data);
            	$scope.list1 = res.data.data;
        }, function errorCallback(response) {
            console.log('wrong');

        });
}]) 