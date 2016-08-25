/**
 * @ngdoc controller
 * @name app.shell.controller:Shell
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.shell')
		.controller('Shell', Shell);

  /* @ngInject */
	function Shell(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.shell.controller:Shell
     * @description
     * My Description rules
     */
    function testFunction(num){
			//console.info('This is a test function');
		}
	}

}());
