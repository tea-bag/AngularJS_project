'use strict';
angular.module('app').controller('searchCtrl', ['$http','$scope','dict','$state', function($http,$scope,dict,$state){
        $scope.search = function(){
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
        }
        $scope.search();

        $scope.name = '';
        $scope.sheet = {};

        $scope.tabList = [
        {
            id:'city',
            name:'城市'
        },{
            id:'salary',
            name:'薪水'
        },{
            id:'amount',
            name:'公司规模'
        }];

        var tabId = '';

        $scope.tClick = function(id,name){
            tabId = id;
            $scope.sheet.list = dict[id];
            $scope.sheet.visible = true;
            console.log('$scope.sheet.list'+$scope.sheet.list);
            console.log(tabId);
        }

        // 筛选 
        $scope.sClick = function(id,name){
        // $scope.tClick();
        if(id){
            angular.forEach($scope.tabList, function(item){
                if( item.id === tabId ){
                    item.name = name;
                    $http.post('http://127.0.0.1:8080/lgw/advis/query?'+item.id+'='+item.name).then(function(resp){
                        console.log(resp.data);
                        $scope.list1 = resp.data.data;
                        
                    });

                }
                // if(1){
                //     $scope.search();
                // }
            });
            // $scope.filterObj[tabId + 'Id'] = id;
            // $scope.filterObj[tabId + 'Id'] = id;
            
        }else{
            // delete $scope.filterObj[tabId + 'Id'];
            angular.forEach($scope.tabList, function(item){
                if( item.id === tabId ){
                    switch (item.id) {
                        case 'city':
                            item.name = '城市';               
                        break;
                        case 'salary':
                            item.name = '薪水';               
                        break;
                        case 'amount':
                            item.name = '公司规模';             
                        break;
                        default:
                    }
                }
            })
        }
    }

}]);
