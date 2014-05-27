(function() {
  'use strict';

  angular.module('angularEnterpriseSeedApp', [
    'ui.router',
    'templates-common',
    'templates-app',
    'angularEnterpriseSeedApp.home',
    'mvvm'
  ])

  .config(function config($stateProvider) {

    $stateProvider.state('main', {
      url: '',
      templateUrl: 'app/main.tpl.html',
      controller: 'MainCtrl'
    });
  });

}());