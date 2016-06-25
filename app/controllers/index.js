'use strict';

module.exports = function(app, q) {
	require('./user')(app,q);
	require('./session')(app);
};
