'use strict';
angular.module('app').controller('positionCtrl', ['$scope','$http','$state','cache', function($scope,$http,$state,cache){
    $scope.isLogin = cache.get('name');
    $scope.name = cache.get('name');
    $scope.uid = cache.get('name') ? cache.get('uid') : -1;
    $scope.message = $scope.name ? '投个简历' : '请先登录';
    console.log($scope.name);
    console.log($scope.uid);
    console.log($scope.message);

    $http.get('http://127.0.0.1:8080/lgw/advis/loadDetail/'+$state.params.id+'/'+$scope.uid)
        .then(function success(response){
            $scope.position = response.data.data;
            console.log($scope.position);
            $scope.fa = response.data.hasCol;
            $scope.imagePath = $scope.fa ? 'image/star-active.png':'image/star.png';
        },function error(response){

    })

    $scope.favorite = function(){
        if ( $scope.fa ) {
            $http.get("http://127.0.0.1:8080/lgw/col/delCol/"+$scope.fa.id).then(function(resp){
                alert( resp.data.message )
                $state.reload();
            })
            return;
        }
        $http.get("http://127.0.0.1:8080/lgw/col/add?"+'&userid='+$scope.uid+'&advertiesid='+$state.params.id).then(function(resp){
                alert( resp.data.message );
                $state.reload();
        })
    }

    $scope.go = function(){
        if($scope.name){
            $http.get("http://127.0.0.1:8080/lgw/apply/add?"+'&userid='+$scope.uid+'&advertiesid='+$state.params.id).then(function(resp){
                if(resp.data.message = '投递成功');
                $scope.message = '已投递'
            })
        }else{
            $state.go('login');
        }
    }
}]) 