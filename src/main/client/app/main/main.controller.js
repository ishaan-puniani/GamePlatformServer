'use strict';

(function () {
  user = {};
  class MainController {

    constructor($http) {
      this.$http = $http;
      this.gameResponse = {};
      this.awesomeThings = [];
      this.walletStats = [];
      this.gameRoundStats = [];
      $http.get('/api/things').then(response => {
        this.awesomeThings = response.data;
      });


      this.walletLabels = [];
      this.walletData = [];

      this.gameRoundLabels = [];
      this.gameRoundData = [];
      var me = this;


      $http.get('/api/wallet').then(response => {
        var dataAry = [], kvp = {};
        angular.forEach(response.data, function (value, key) {
          kvp[value._id] = value.total < 0 ? -1 * value.total : value.total;
        });
        this.walletLabels.push("Bet Placed");
        dataAry.push(kvp.BET);

        this.walletLabels.push("Win Retuned")
        dataAry.push(kvp.WIN);
        this.walletData.push(dataAry);
        //$(window).trigger('resize');
      });
      setTimeout(function () {
        $http.get('/api/gameRounds/allGameRounds').then(response => {
          var dataAry = [];
          angular.forEach(response.data, function (value, key) {
            me.gameRoundLabels.push(value._id)
            dataAry.push(value.count)
          });
          me.gameRoundData.push(dataAry);
        });
      }, 100);


      this.availableGames = [];
      $http.get('/api/games', {filter: {active: true}}).then(response => {
        this.availableGames = response.data;
      });

    }

    getGameResponse() {
      this.$http.post('/api/games/play', {
        game: this.selectedGame.gameId,
        action: this.action,
        bet: this.bet
      }).then(response => {
        this.gameResponse = response.data;
        // alert(this.gameResponse);
      });

    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {name: this.newThing});
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
