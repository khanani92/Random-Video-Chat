/**
 * @ngdoc overview
 * @name app.welcome
 * @description Welcome module defines the config block and state router configurations
 *              Following urls are configured with in this block
 *              1. '/welcome'
 */

(function(){

  angular.module('app.welcome', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    $stateProvider
      .state('shell.welcome', {
        url:'/welcome',
        views: {
          'content@shell': {
            templateUrl: 'src/welcome/welcome.html',
            controller: 'Welcome as vm'
          }
        },
        title: 'Random Video Chat'
      });
  }

}());
