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
	function Chat(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.chat.controller:Chat
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
    
	}

}());
