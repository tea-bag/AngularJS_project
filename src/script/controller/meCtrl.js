'use strict';
angular.module('app').controller('meCtrl', ['cache','$scope','$state', function(cache,$scope,$state){
        if(cache.get('name')){
                $scope.name = cache.get('name');
        }
        $scope.logout = function(){
                cache.remove('name');
                $state.reload();
        }
        console.log($scope.name);
}]) 