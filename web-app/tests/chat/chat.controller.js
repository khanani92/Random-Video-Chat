(function(){

  /* global module, inject */

  'use strict';

  describe('Controller: Chat', function(){

    beforeEach(module('app.core'));
    beforeEach(module('app.chat'));

    var ctrl;
    var scope;

    beforeEach(inject(function($controller, $injector){

      scope = $injector.get('$rootScope');

      ctrl = $controller('Chat', {
        //add injectable services
      });

    }));

    it('should do nothing', function(){
      expect(true).toBe(false);
    });

  });
}());
