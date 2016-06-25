
module.exports = function(app, q) {

//Encryption and Decryption Code
  var crypto = require('crypto'),
    algorithm = 'aes-256-gcm',
    password = '3zTvzr3p67VC61jmV54rIYu1545x4TlY',
    iv = '60iP0h6vJoEa';

    app.services.encrypt = function (text, callBack) {
      var cipher = crypto.createCipheriv(algorithm, password, iv);
      var encrypted = cipher.update(text, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      // var tag = cipher.getAuthTag();
      callBack({
        content: encrypted
        // tag: tag
      });
    };

  app.services.decrypt = function (encrypted, callBack) {
    var decipher = crypto.createDecipheriv(algorithm, password, iv);
    // decipher.setAuthTag(encrypted.tag);
    var dec = decipher.update(encrypted, 'hex', 'utf8');
    // dec += decipher.final('utf8');
    callBack(dec);
  };
}
