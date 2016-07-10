/**
 * Created by khanani92 on 5/1/16.
 */
'use strict';
module.exports = function(app,q) {
  app.constants.sessionManagement = require('./session');
  var io;

  app.services._socketEvents = function(io){
    io.on('connection',function(socket){
      console.log( "We have a connection!" +socket.client.id);
      app.services._registerSocket(io);

      socket.on('register', function(data){
        return  app.services._addMySession(socket.client.id, data);
      });


      socket.on('disconnect', function(){
        console.log( "User is  disconnected"+socket.id);
        app.services._disconnect(socket.client.id)
      });
    });
  };


  app.services._registerSocket = function(sio){
    io= sio;
  };

  app.services._addMySession = function(socketID, data){
        var userTemp = {};
        var userSocket = app.constants.sessionManagement.getUserByID(data.id);
        if(!userSocket){
          userTemp.id =  data.id;
          userTemp.sessionID = socketID;
          app.constants.sessionManagement.addUser(userTemp);
          io.sockets.connected['/#'+socketID].emit('registeredToSocket', {});
          io.sockets.emit('listOfOnlineUser', app.sessionManagement.getAllMembers());
        }else{
          app.constants.sessionManagement.addUserSession({id:userSocket.id, sessionID:socketID});
          io.sockets.connected['/#'+socketID].emit('registeredToSocket', {});
        }
  };

  app.services._disconnect = function(socketID){
    var userSocket = app.constants.sessionManagement.getUserBySessionID(socketID);
    if (userSocket !== undefined){
      if(userSocket.session.length === 1){
        app.constants.sessionManagement.removeUser(userSocket);
      }else{
        app.constants.sessionManagement.removeUserSession({id:userSocket.id, sessionID:socketID})
      }
    }
  };



};
