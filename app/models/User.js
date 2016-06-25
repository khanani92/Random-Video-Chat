'use strict';

module.exports = function(app, db) {
  var _Schema = db.Schema,
    uniqueValidator = require('mongoose-unique-validator');


  var _UserSchema = new _Schema({
      firstName: {type: String},
      lastName: {type: String},
      password: {type: String},
      emailAddress: {type: String, unique: true},
      block: {type: Boolean},
      pinCode: {type: String},
      sessionToken: {type: String},
      createdAt: {type: Number},
      lastLogin: {type: Number},
      dateOfBirth: {type: Number},
      location: {type: Object},
      gender: {type: String},
      profilePic: {type: String},
      socialId: {type: String},
      userName: {type: String}
    }
  );









  var _User = db.model('User', _UserSchema);
  // _User.plugin(uniqueValidator, { message: 'Error, Email match found' });
  app.db.User = _User;

};
