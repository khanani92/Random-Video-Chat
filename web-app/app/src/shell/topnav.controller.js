/**
 * @ngdoc controller
 * @name app.shell.controller:TopNav
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.shell')
		.controller('TopNav', TopNav);

  /* @ngInject */
	function TopNav(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.shell.controller:TopNav
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
