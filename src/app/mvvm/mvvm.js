angular.module('mvvm', [])

.config(function config($stateProvider) {
  $stateProvider.state('mvvm', {
    url: '/mvvm',
    templateUrl: 'app/mvvm/mvvm.tpl.html',
    controller: 'MVVMCtrl'
  });
})

.controller('MVVMCtrl', ['$scope',
  function($scope) {

    $scope.user = {};
    $scope.user.name = "Owen";

    $scope.sayHi = function(){
      alert("Hello: " + $scope.user.name);
    };
  }
]);