/**
 * @ngdoc overview
 * @name app.shell
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.shell', [])
    .config(configuration);

  /* @ngInject */
  function configuration($stateProvider){

    //add your state mappings here
    $stateProvider
      .state('shell', {
        url: '',
        abstract: true,
        title: 'Random Video Chat',
        views: {
          '@': {
            templateUrl: 'src/shell/shell.html',
            controller: 'Shell as vm'
          },
          'topNavBar@shell': {
            templateUrl: 'src/shell/topNav.html',
            controller: 'TopNav as vm'
          },
          'subNavBar@shell': {
            templateUrl: 'src/shell/subNav.html',
            controller: 'SubNav as vm'
          }
        }
      });
  }

}());
