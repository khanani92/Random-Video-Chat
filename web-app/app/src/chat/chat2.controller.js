/**
 * @ngdoc controller
 * @name app.chat.controller:Chat
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.chat')
		.controller('Chat2', Chat);

  /* @ngInject */
	function Chat(socket){
		var vm = this;
    //var constraints = {audio:true, video: true};
    var constraints = { video: true};
    var video = document.querySelector('video');

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
      //console.log(data);
    });

    socket.on('listOfOnlineUser',function(data){
      vm.listOfOnlineUser = data;
    });



    ///Audio/Video Capture



    function hasGetUserMedia() {
      return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia || navigator.msGetUserMedia);
    }

    if (hasGetUserMedia()) {
      // Good to go!
      navigator.webkitGetUserMedia(constraints,successCallback, errorCallback)
    } else {
      alert('getUserMedia() is not supported in your browser');
    }



    function successCallback(stream){
      //vm.videoSrc = window.URL.createObjectURL(stream)
      video.src = window.URL.createObjectURL(stream);
    }

    function errorCallback(error){
      //console.log('navigator.getUserMedia', error)
    }

	}

}());
