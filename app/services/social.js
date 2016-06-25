/**
 * Created by muddassir on 11/4/16.
 */
'use strict';
module.exports = function(app,q) {
  var request = require('request');

  app.services._socialLogin = function(payload){
    var deferred = q.defer();
    var fields = ['id', 'first_name', 'last_name', 'email', 'picture'];
     request.get('https://graph.facebook.com/me?access_token=' + payload.socialAccessToken + '&fields=' + fields.join(), function(error, response, body) {
      var res = JSON.parse(body);
      if (!error && response.statusCode === 200) {
        var userInfo ={
          social: payload.social,
          firstName: res.first_name,
          lastName: res.last_name,
          email: res.email,
          socialId: res.id,
          token: payload.socialAccessToken,
          profilePic : res.picture.data.url
        };
        app.services._chkAndRegister(userInfo)
          .then(function(response){
            deferred.resolve(response);
          })
      }
      else {
        deferred.reject(res.error.message);
      }
    });
    return deferred.promise;
  };

};

