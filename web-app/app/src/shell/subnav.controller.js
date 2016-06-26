/**
 * @ngdoc controller
 * @name app.shell.controller:Subnav
 * @description < description placeholder >
 */

(function(){

  'use strict';

	angular
		.module('app.shell')
		.controller('SubNav', Subnav);

  /* @ngInject */
	function Subnav(){
		var vm = this;

		vm.testFunction = testFunction;

    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.shell.controller:Subnav
     * @description
     * My Description rules
     */
    function testFunction(num){
			console.info('This is a test function');
		}
	}

}());
