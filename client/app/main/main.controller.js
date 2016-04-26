'use strict';

(function() {

class MainController {

  constructor($http) {
    this.$http = $http;
    this.gameResponse = {};
    this.awesomeThings = [];
    $http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
    });




    this.availableGames = [];
    $http.get('/api/games',{filter:{active:true}}).then(response => {
      this.availableGames = response.data;
    });
      
  }
  
  getGameResponse(){
      this.$http.post('/api/games/play',{game:this.selectedGame.gameId,action:this.action,bet:this.bet}).then(response => {
        this.gameResponse = response.data;
         alert(this.gameResponse);
      });
     
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('gamePlatformServerApp')
  .controller('MainController', MainController);

})();
