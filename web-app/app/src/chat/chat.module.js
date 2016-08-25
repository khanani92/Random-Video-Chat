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
      })
  .state('shell.chat2', {
      url:'/chat2',
      views: {
        'content@shell': {
          templateUrl: 'src/chat/chat2.html',
          controller: 'Chat2 as vm'
        }
      },
      title: 'Random Video Chat'
    })
      .state('shell.webRTC', {
        url:'/webrtc',
        views: {
          'content@shell': {
            templateUrl: 'src/chat/WebRTC-Tutorials.html',
            controller: 'Chat2 as vm'
          }
        },
        title: 'Random Video Chat'
      })
      .state('shell.chat3', {
        url:'/chat3',
        views: {
          'content@shell': {
            templateUrl: 'src/chat/chat3.html',
            controller: 'Chat3 as vm'
          }
        },
        title: 'Random Video Chat'
      });
  }

}());
