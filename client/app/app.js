'use strict';

angular.module('gamePlatformServerApp', [
  'gamePlatformServerApp.auth',
  'gamePlatformServerApp.admin',
  'gamePlatformServerApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'chart.js'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
