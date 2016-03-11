'use strict';

angular.module('gamePlatformServerApp.auth', [
  'gamePlatformServerApp.constants',
  'gamePlatformServerApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
