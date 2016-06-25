'use strict';
module.exports = function(app,q) {

  //app.controllers._doSignIn = function(req,res){
  //  res.send('Doing Login');
  //}
  var Bcrypt = require('bcrypt-nodejs'),
    User = app.db.User,
    jwt  = require('jsonwebtoken');



  app.controllers._welcome = function(req, res) {
    res.json({
      data: {
        message: 'Welcome!'
      }
    });
  };

  // Create endpoint /api/users for POST
  app.controllers._socialLogin = function(req,res){
    var payload = {
      socialAccessToken: req.body.socialAccessToken
    };
    app.services._socialLogin(payload)
      .then(function(respose){
        res.send(respose)
      })
      .catch(function(error) {
        res.send(error)
      });
  };


  app.controllers._guestLogin = function(req, res) {
    var userName = req.body.userName,
      password = req.body.password;
    if(userName && password )
    {
      //Encryption of registration data
      app.services.encrypt(password,function(passwordEy) {
        var _password = passwordEy.content;
        var payload =  {
            userName: userName,
            password: _password,
            block: false,
            sessionToken: '',
            createdAt: new Date().valueOf()
          };

        app.services._guestLogin(payload)
          .then(function(respose){
            res.send(respose)
          })
          .catch(function(error) {
            res.send(error)
          });
      });
    }
    else{
      res.send({
        code : 404 ,
        content : 'Not Found',
        message : 'Missing Credentials'
      });
    }
  };

  app.controllers._getProfile = function(req, res){
    app.services._getUsers([req.params.id], 'firstName lastName userName dateOfBirth location gender tags profilePic')
      .then(function(user) {
        res.send({
          status:200,
          message: 'Successfully get USER',
          data: user.data
        })
      })
      .catch(function(error) {
        res.send(error)
      });
  };

};
