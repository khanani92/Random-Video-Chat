/**
 * @ngdoc service
 * @name app.common.socket
 * @description < description placeholder >
 */

(function(){

  'use strict';

  angular
    .module('app.common')
    .factory('socket', socket);

  /* @ngInject */
  function socket($rootScope){
    var socket;
    return {
      socketConnect: socketConnect,
      on: on,
      emit: emit,
      socket: wholeSocket
    };

    ////////////////////

    /**
     * @ngdoc
     * @name app.common.socket#testFunction
     * @methodOf app.common.socket
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * socket.testFunction(id);
     * </pre>
     * @param {int} entity id
     */

    function socketConnect(url){
      var socketID = sessionStorage.getItem('sessionID');
      var userData =  JSON.parse(localStorage.getItem('user'));
      if(socketID && (userData && (Object.keys(userData).length > 0))){
        console.log("exist");
        console.log(socketID);
        //socket =io.connects("https://cpback.herokuapp.com//api")
        socket =io.connect(url);
        socket.emit('checkSocketConnection',{socketID:socketID,userID:userData.id})
      }else{
        console.log("not--exist");

        //socket =io.connects("https://cpback.herokuapp.com//api");
        socket =io(url);
      }
      $.support.cors=true;
      //$.mobile.allowCrossDomainPages = true;
      //$.mobile.pushStateEnabled      = false;

    }

    function on(eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    }

    function emit(eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }

    function wholeSocket(){
      return socket
    }

  }


}());
