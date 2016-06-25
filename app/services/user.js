/*
 All the method relative to the user
 */

module.exports = function(app, q) {
  var User = app.db.User,
    jwt  = require('jsonwebtoken');

  app.services._guestLogin = function(payload){
    var deferred = q.defer();
    var register_info = new User(payload);

    register_info.save(function (error, data) {
      if (error) {
        deferred.reject({
          code: 400,
          content: 'Bad Request',
          message: 'Error In API'
        });
      }
      else {
        var token = jwt.sign(data.userName, app.constants.encryptKey, {
          expiresIn: 10800 // expires in 3 hours
        });
        User.update({userName: payload.userName}, {
          "sessionToken": token
        }, function () {
          deferred.resolve({
            code: 200,
            content: 'OK',
            message: 'Authentication Successful',
            token: token
          });
        });
      }
    });
    return deferred.promise;
  };

  app.services._getUsers = function(userIDs, filers) {
    var deferred = q.defer();
    User
      .find({
        '_id': {
          $in: userIDs
        }
      })
      .select(filers)
      .exec(function(error, user) {
        if (error) {
          deferred.reject({
            message: 'Error in get USER API',
            error: error
          });
        } else {
          deferred.resolve({
            message: 'Successfully get USER',
            data: user
          });
        }
      });
    return deferred.promise;
  };

  app.services._chkAndRegister = function(userInfo){
    var deferred = q.defer();
    User
      .findOne({socialId: userInfo.socialId})
      .exec(function(error,data){
        if (error) {
          deferred.reject({
            message: 'Error in get USER API',
            error: error
          });
        } else {
          var token = jwt.sign(data, app.constants.encryptKey, {
            expiresIn: 10800 // expires in 3 hours
          });
          if(!data){
            //save
            var user_info = new User({
              firstName : userInfo.firstName,
              lastName : userInfo.lastName,
              email:userInfo.email,
              pictureUrl:userInfo.pictureUrl,
              socialId:userInfo.socialId,
              sessionToken:token,
              createdAt: new Date().valueOf()
            });
            user_info.save(function(err,data){
              if(err){
                deferred.reject({
                  message: 'Error in get USER API',
                  error: error
                });
              }else{
                deferred.resolve({
                  status: 200,
                  message:'Authentication Successful',
                  token: token
                });
              }
            });//>save
          }else{
            //get
            User.update({socialId: userInfo.socialId}, {
              "sessionToken": token
            }, function () {
              deferred.resolve({
                code: 200,
                content: 'OK',
                message: 'Authentication Successful',
                token: token
              });
            });
          }
        }
      });
    return deferred.promise;
  };

};
