/**
 * @ngdoc overview
 * @name app.core
 * @description Configuration block for routing
 */

(function(){

  'use strict';

  angular.module('app.core')
    .config(configuration)
    .run(routingEvents)
    .run(socketConnection);

  /* @ngInject */
  function configuration($urlRouterProvider){

    $urlRouterProvider.otherwise('/welcome');

  }

  /* @ngInject */
  function routingEvents($rootScope){
    //on routing error
    $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams){
      //do some logging and toasting
    });

    //on routing error
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      //do some title setting
      $rootScope.pageTitle = toState.title || 'app';
    });
  }
  function socketConnection(socket){
    //var url = 'http://localhost:3000';
      var url = 'https://random-video-chat.herokuapp.com/';
    socket.socketConnect(url);
  }

}());
