'use strict';

class NavbarController {

  constructor(Auth) {
    this.menu = [{
      'title': 'Home',
      'state': 'main'
    }];

    this.isCollapsed = true;

    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('gamePlatformServerApp')
  .controller('NavbarController', NavbarController);
