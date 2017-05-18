"use strict";angular.module("app",["ui.router","ngCookies"]),angular.module("app").value("dict",{}).run(["dict","$http",function(t,e){e.get("data/city.json").then(function(e){t.city=e.data}),e.get("data/salary.json").then(function(e){t.salary=e.data}),e.get("data/amount.json").then(function(e){t.amount=e.data})}]),angular.module("app").config(["$stateProvider","$urlRouterProvider",function(t,e){t.state("main",{url:"/main",templateUrl:"view/main.html",controller:"mainCtrl"}).state("search",{url:"/search/:id",templateUrl:"view/search.html",controller:"searchCtrl"}).state("me",{url:"/me",templateUrl:"view/me.html",controller:"meCtrl"}).state("grLogin",{url:"/grLogin",templateUrl:"view/template/grLogin.html",controller:"grLoginCtrl"}).state("qyLogin",{url:"/qyLogin",templateUrl:"view/template/qyLogin.html",controller:"qyLoginCtrl"}).state("grRegister",{url:"/grRegister",templateUrl:"view/template/grRegister.html",controller:"grRegisterCtrl"}).state("qyRegister",{url:"/qyRegister",templateUrl:"view/template/qyRegister.html",controller:"qyRegisterCtrl"}).state("position",{url:"/position/:id",templateUrl:"view/template/position.html",controller:"positionCtrl"}).state("favorite",{url:"/position",templateUrl:"view/template/favorite.html",controller:"favoriteCtrl"}).state("post",{url:"/post",templateUrl:"view/template/post.html",controller:"postCtrl"}),e.otherwise("main")}]),angular.module("app").controller("favoriteCtrl",["$http","$scope","cache",function(t,e,a){e.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}],e.uid=a.get("uid"),t.get("http://127.0.0.1:8080/lgw/apply/loadData/"+e.uid+"/new").then(function(t){e.list1=t.data.data,console.log(t.data)}),e.filterObj={},e.tClick=function(t,a){switch(t){case"all":delete e.filterObj.state;break;case"pass":e.filterObj.state="1";break;case"fail":e.filterObj.state="-1"}}}]),angular.module("app").controller("grLoginCtrl",["$http","$scope","$state","cache",function(t,e,a,n){e.submit=function(){t({method:"GET",params:{username:e.user.phone,password:e.user.pwd},url:"http://127.0.0.1:8080/lgw/user/login"}).then(function(t){console.log(t.data.message),console.log(t.data.data.username),"登录成功"==t.data.message&&(n.put("name",t.data.data.username),n.put("uid",t.data.data.id),a.go("main"))},function(t){})},e.submitcompany=function(){t({method:"GET",params:{username:e.user.phone,password:e.user.pwd},url:"http://127.0.0.1:8080/lgw/company/login"}).then(function(t){console.log(t.data.message),console.log(t.data.data.username),"登录成功"==t.data.message&&(n.put("name",t.data.data.username),n.put("uid",t.data.data.id),a.go("main"))},function(t){})}}]),angular.module("app").controller("grRegisterCtrl",["$http","$scope","$state",function(t,e,a){e.send=function(){t({method:"GET",params:{username:e.user.phone,password:e.user.pwd},url:"http://127.0.0.1:8080/lgw/user/loadValidCode"}).then(function(t){console.log(t.data.message),"成功"==t.data.message&&(e.id=t.data.data.id,e.validcode=t.data.data.code)},function(t){})},e.submit=function(){t({method:"GET",params:{validcode:e.validcode,id:e.id},url:"http://127.0.0.1:8080/lgw/user/regist"}).then(function(t){console.log(t.data.message),"注册成功"==t.data.message?(a.go("grLogin"),console.log("登录页面")):console.log("注册失败")},function(t){})}}]),angular.module("app").controller("mainCtrl",["$http","$scope",function(t,e){t({method:"GET",params:{},url:"http://127.0.0.1:8080/lgw/advis/query"}).then(function(t){console.log(t.data),e.list1=t.data.data},function(t){console.log("wrong")})}]),angular.module("app").controller("meCtrl",["cache","$scope","$state",function(t,e,a){t.get("name")&&(e.name=t.get("name")),e.logout=function(){t.remove("name"),a.reload()},console.log(e.name)}]),angular.module("app").controller("meLoginCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("positionCtrl",["$scope","$http","$state","cache",function(t,e,a,n){t.isLogin=n.get("name"),t.name=n.get("name"),t.uid=n.get("name")?n.get("uid"):-1,t.message=t.name?"投个简历":"请先登录",console.log(t.name),console.log(t.uid),console.log(t.message),e.get("http://127.0.0.1:8080/lgw/advis/loadDetail/"+a.params.id+"/"+t.uid).then(function(e){t.position=e.data.data,console.log(t.position),t.fa=e.data.hasCol,t.imagePath=t.fa?"image/star-active.png":"image/star.png"},function(t){}),t.favorite=function(){if(t.fa)return void e.get("http://127.0.0.1:8080/lgw/col/delCol/"+t.fa.id).then(function(t){alert(t.data.message),a.reload()});e.get("http://127.0.0.1:8080/lgw/col/add?&userid="+t.uid+"&advertiesid="+a.params.id).then(function(t){alert(t.data.message),a.reload()})},t.go=function(){t.name?e.get("http://127.0.0.1:8080/lgw/apply/add?&userid="+t.uid+"&advertiesid="+a.params.id).then(function(e){e.data.message="投递成功",t.message="已投递"}):a.go("login")}}]),angular.module("app").controller("postCtrl",["$http","$scope","cache",function(t,e,a){console.log(a.get("uid")),e.tabList=[{id:"all",name:"全部"},{id:"pass",name:"面试邀请"},{id:"fail",name:"不合适"}],e.uid=a.get("uid"),t.get("http://127.0.0.1:8080/lgw/apply/loadData/"+e.uid+"/new").then(function(t){e.list1=t.data.data,console.log(t.data)}),e.filterObj={},e.tClick=function(t,a){switch(t){case"all":delete e.filterObj.state;break;case"pass":e.filterObj.state="1";break;case"fail":e.filterObj.state="-1"}}}]),angular.module("app").controller("qyLoginCtrl",["$http","$scope",function(t,e){}]),angular.module("app").controller("qyRegisterCtrl",["$http","$scope",function(t,e){e.send=function(){t({method:"GET",params:{companyname:e.user.companyname,username:e.user.phone,password:e.user.pwd,empnum:e.user.num},url:"http://127.0.0.1:8080/lgw/company/loadValidCode"}).then(function(t){console.log(t.data.message),"成功"==t.data.message&&(e.id=t.data.data.id,e.validcode=t.data.data.code)},function(t){})},e.submit=function(){t({method:"GET",params:{validcode:e.validcode,id:e.id},url:"http://127.0.0.1:8080/lgw/company/regist"}).then(function(t){console.log(t.data.message),"注册成功"==t.data.message?($state.go("grLogin"),console.log("登录页面")):console.log("注册失败")},function(t){})}}]),angular.module("app").controller("searchCtrl",["$http","$scope","dict","$state",function(t,e,a,n){e.search=function(){t({method:"GET",params:{},url:"http://127.0.0.1:8080/lgw/advis/query"}).then(function(t){console.log(t.data),e.list1=t.data.data},function(t){console.log("wrong")})},e.search(),e.name="",e.sheet={},e.tabList=[{id:"city",name:"城市"},{id:"salary",name:"薪水"},{id:"amount",name:"公司规模"}];var o="";e.tClick=function(t,n){o=t,e.sheet.list=a[t],e.sheet.visible=!0,console.log("$scope.sheet.list"+e.sheet.list),console.log(o)},e.sClick=function(a,n){a?angular.forEach(e.tabList,function(a){a.id===o&&(a.name=n,t.post("http://127.0.0.1:8080/lgw/advis/query?"+a.id+"="+a.name).then(function(t){console.log(t.data),e.list1=t.data.data}))}):angular.forEach(e.tabList,function(t){if(t.id===o)switch(t.id){case"city":t.name="城市";break;case"salary":t.name="薪水";break;case"amount":t.name="公司规模"}})}}]),angular.module("app").directive("appFoot",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/foot.html"}}),angular.module("app").directive("footBar",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/footbar.html"}}),angular.module("app").directive("appHead",["cache",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/head.html",link:function(e){e.name=t.get("name")||""}}}]),angular.module("app").directive("headBar",["cache",function(t){return{restrict:"A",replace:!0,templateUrl:"view/template/headbar.html",scope:{text:"@"},link:function(e){e.back=function(){window.history.back()},e.name=t.get("name")}}}]),angular.module("app").directive("appPositionList",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/mainList.html"}}),angular.module("app").directive("meLogin",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/meLogin.html"}}),angular.module("app").directive("positionList",["$http","cache",function(t,e){return{restrict:"A",replace:!0,templateUrl:"view/template/positionlist.html",link:function(t){}}}]),angular.module("app").directive("searchBar",function(){return{restrict:"A",replace:!0,scope:{list:"=",tabClick:"&"},templateUrl:"view/template/searchbar.html",link:function(t){t.click=function(e){t.selectId=e.id,t.selectName=e.name,t.tabClick(e)}}}}),angular.module("app").directive("searchHead",function(){return{restrict:"A",replace:!0,templateUrl:"view/template/searchhead.html"}}),angular.module("app").directive("appSheet",function(){return{restrict:"A",replace:!0,scope:{list:"=",visible:"=",select:"&"},templateUrl:"view/template/sheet.html"}}),angular.module("app").filter("mf",function(){return function(t){return t.split(" ")[0]}}),angular.module("app").service("cache",["$cookies",function(t){this.put=function(e,a){t.put(e,a)},this.get=function(e){return t.get(e)},this.remove=function(e){t.remove(e)}}]);