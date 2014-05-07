(function() {
  'use strict';
  
  angular.module('angularEnterpriseSeedApp')
    .controller('MainCtrl', function($scope) {
      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];
    });
}());