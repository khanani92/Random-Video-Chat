
'use strict';

module.exports = function(app, router) {

	app.use('/api', router);

	/*router
	 .route('/login')
	 .post(app.controllers._doSignIn);*/

	//this url need discussion
	router
		.route('/unauthorized', function(req, res) {
			res.send({
				message: "The request is Unauthorized"
			});
		});
	//this url need discussion

	router.route('/api')
		.get(app.controllers._welcome);

	//////////////////////////////////////////////////
	///////////////USER RELATED API's/////////////////
	//////////////////////////////////////////////////

	/** Create endpoint handlers for /users */
	/*router.route('/login')
	 .post(  app.controllers._login);*/

	/*This is temp router for testing the api*/
	router.route('/guestLogin')
		.post(app.controllers._guestLogin);
  router.route('/social')
    .post(app.controllers._socialLogin);
  //router.use(app.services._checkSessionToken);
  router.route('/checkExpiry')
    .post(app.controllers._checkExpiry);
  router.route('/profile/:id')
    .get(app.services._checkSessionToken,app.controllers._getProfile);
  //router.route('/profile')
  //  .post(app.services._checkSessionToken,app.controllers._updateProfile);



};
