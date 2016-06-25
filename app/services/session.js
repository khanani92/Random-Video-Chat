/**
 * Created by khanani92 on 5/1/16.
 */
'use strict';

var userSessionList=[];
var lodash  = require('lodash');


var sessionManagement ={
  addUser : function(user){
    if(! lodash.find(userSessionList,['id', user.id] )){
      //if(app.constants.highestLevel < userLevel){  app.constants.highestLevel = userLevel }
      userSessionList.push({
        id:user.id,
        session: [user.sessionID]
      })
    }
  },
  removeUser: function(user){
    if(!(lodash.findIndex(userSessionList, ['id', user.id]) <= -1)){
      lodash.remove(userSessionList,['id', user.id])
    }
  },
  addUserSession: function(user){
    var userIndex = lodash.findIndex(userSessionList, ['id', user.id]);
    if(!(userIndex <= -1)){
      if((lodash.indexOf(userSessionList[userIndex].session, user.sessionID) <= -1)){
        userSessionList[userIndex].session.push(user.sessionID);
      }
    }
  },
  removeUserSession: function(user){
    var userIndex = lodash.findIndex(userSessionList, ['id', user.id]);
    if(!(userIndex <= -1)){
      if(!(lodash.indexOf(userSessionList[userIndex].session, user.sessionID) <= -1)){
        lodash.pull(userSessionList[userIndex].session,user.sessionID);
      }
    }
  },
  getUserByID: function(userID){
    return lodash.find(userSessionList,['id', userID] );
  },
  getUserBySessionID: function(sessionID){
    var userTemp;
    lodash.forEach(userSessionList,function(user, userkey) {
      lodash.forEach(user.session,function(session, sessionKey) {
        if(session === sessionID){
          userTemp = user;
          return false;
        }
      })
    });
    return userTemp;
  },
  getAllMembers: function(){
    return userSessionList;
  },
  setAllMembers: function(userList){
    userSessionList = userSessionList.concat(userList);
  }

};

module.exports = sessionManagement;
