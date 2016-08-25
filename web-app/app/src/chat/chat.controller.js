/**
 * @ngdoc controller
 * @name app.chat.controller:Chat
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.chat')
		.controller('Chat', Chat);

  /* @ngInject */
	function Chat(socket){
		var vm = this;

		vm.addMeToSocket = addMeToSocket;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.chat.controller:Chat
     * @description
     * My Description rules
     */
    function addMeToSocket(num){
			socket.emit('register',{id:Math.floor((Math.random() * 100) + 1)})
		}

    socket.on('registeredToSocket',function(data){
      console.log(data);
    });

    socket.on('listOfOnlineUser',function(data){
      vm.listOfOnlineUser = data;
    })

	}

}());
