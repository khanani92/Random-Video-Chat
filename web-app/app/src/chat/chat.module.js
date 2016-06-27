/**
 * @ngdoc overview
 * @name app.chat
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.chat', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    //add your state mappings here
    $stateProvider
      .state('shell.chat', {
        url:'/chat',
        views: {
          'content@shell': {
            templateUrl: 'src/chat/chat.html',
            controller: 'Chat as vm'
          }
        },
        title: 'Random Video Chat'
      });
  }

}());
