(function() {
    'use strict';
    module.exports = function(db, app) {
        app.controllers = {};
        app.db = {};
        app.services = {};
        app.constants = {};


        require('./db')(db);
        require('./logs')(app);
    }
})();
