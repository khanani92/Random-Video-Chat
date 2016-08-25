(function(){

  /* global module, inject */

  'use strict';

  describe('Factory: socket', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.common'));

    var socket;

    beforeEach(inject(function($injector){

      socket = $injector.get('socket');

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
