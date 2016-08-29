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


      /////////////////////////////
      /////////////////////////////

      function log() {
        var array = ['Message from server:'];
        array.push.apply(array, arguments);
        socket.emit('log', array);
      }

      socket.on('message', function(message) {
        log('Client said: ', message);
        // for a real app, would be room-only (not broadcast)
        socket.broadcast.emit('message', message);
      });

      socket.on('create or join', function(room) {
        log('Received request to create or join room ' + room);

        //var numClients = io.sockets.sockets.length;
        var numClients = Object.keys(io.sockets.connected).length;;
        log('Room ' + room + ' now has ' + numClients + ' client(s)');

        if (numClients === 1) {
          socket.join(room);
          log('Client ID ' + socket.id + ' created room ' + room);
          socket.emit('created', room, socket.id);

        } else if (numClients > 1) {
          log('Client ID ' + socket.id + ' joined room ' + room);
          io.sockets.in(room).emit('join', room);
          socket.join(room);
          socket.emit('joined', room, socket.id);
          io.sockets.in(room).emit('ready');
        } else { // max two clients
          socket.emit('full', room);
        }
      });

      socket.on('ipaddr', function() {
        var ifaces = os.networkInterfaces();
        for (var dev in ifaces) {
          ifaces[dev].forEach(function(details) {
            if (details.family === 'IPv4' && details.address !== '127.0.0.1') {
              socket.emit('ipaddr', details.address);
            }
          });
        }
      });

      socket.on('bye', function(){
        console.log('received bye');
      });

      ///////////////////////////
      ///////////////////////////

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
          io.sockets.connected['/#'+socketID].emit('registeredToSocket', {message:'you are registered '});
          io.sockets.emit('listOfOnlineUser', app.constants.sessionManagement.getAllMembers());
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
