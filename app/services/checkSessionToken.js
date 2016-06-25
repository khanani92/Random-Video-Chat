/**
 * Created by muddassir on 18/12/15.
 */
module.exports = function(app, q) {
  var User = app.db.User,
    jwt = require('jsonwebtoken');
  app.services._checkSessionToken = function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token       = req.body.token || req.query.token || req.headers['x-access-token'],
      emailAddress = req.body.emailAddress || req.query.emailAddress || req.headers['x-access-emailaddress'];

    // decode token
    if (token && emailAddress) {
     // app.services.encrypt(emailAddress,function(userEmail) {
       // var _encryptEmailAddress = userEmail.content;

        User.findOne({emailAddress : emailAddress , sessionToken:token}, function (err,user) {
          if(err){
            res.send({
              code: 404,
              content : 'Not Found',
              message: 'Missing token or email address'
            });
          }
          else if(user!=null){
            if(user._doc.block == false){
              jwt.verify(token, app.constants.encryptKey, function(err, decoded) {
                if (err) {
                  return res.send({
                    code: 400 ,
                    content : 'Bad Request',
                    message: 'Token is Expired'
                  });
                } else {
                  var myDate = '';
                  if(decoded[0] !=undefined){
                    myDate = new Date(decoded[0].__timeStamp);
                  }
                  else{
                    myDate = new Date(decoded.__timeStamp);
                  }
                  // myDate.setMinutes(myDate.getMinutes());
                  var secondsDiff = new Date().getTime() - myDate.getTime();
                  var Seconds_from_T1_to_T2 = secondsDiff / 1000;
                  var Minutes_Between_Dates = Math.floor(Seconds_from_T1_to_T2)/60;

                  if (Seconds_from_T1_to_T2 >= 0 && Minutes_Between_Dates <= 170) {
                    req.___new__token = token;
                    next();
                  }
                  else if(Minutes_Between_Dates >= 180){
                    res.send({
                      code: 400 ,
                      content : 'Bad Request',
                      message: 'Token is Expired'
                    });
                  }
                  else {
                    // issue a new token
                    delete user._doc.sessionToken;
                    user._doc.__timeStamp = new Date();
                    var refreshed_token = jwt.sign(user, app.constants.encryptKey, {expiresInMinutes: 180});
                    req.___new__token = refreshed_token;
                    User.update({"emailAddress": _encryptEmailAddress}, {

                      "sessionToken": refreshed_token

                    }, function () {
                      next();
                    });
                  }
                }
              });
            }
            else{
              res.send({
                code: 400 ,
                content : 'Bad Request',
                message: 'Your account is blocked, please contact admin'
              });
            }
          }
          else{
            res.send({
              code: 400 ,
              content : 'Bad Request',
              message: 'Email and token mismatch'
            });
          }

        });
     // })
    }
    else {
      // if there is no token return an error
      res.send({
        code: 404,
        content : 'Not Found',
        message: 'Missing token or email address'
      });
    }
  };

};
