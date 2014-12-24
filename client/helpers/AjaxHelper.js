'use strict';

var data = require("../SampleData.js");
var Q = require("q");
var $ = {};

/*
req object
req.type === "GET", "POST"...
req.location === "rooms", "messages"
req.data = object
req.data.roomId = room id (not required for getting rooms)
req.data.messageId = message id (not required for getting messages)
req.data.roomname = room name
req.data.username = user name
req.data.text = message text
*/

$.ajax = function(req) {

  var defered = Q.defer();
  var i,j;
  if (req.type === 'GET') {
    setTimeout( function() {
      if (req.location === 'rooms') {
        if (typeof(req.data.roomId) !== 'undefined') {
          for (i = 0; i < data.length; i++) {
            if (data[i].id === req.data.roomId) {
              defered.resolve(data[i]);
            }
          }
        }
        else {
          defered.resolve(data.slice());
        }

      }
      else if (req.location === 'messages') {
        if (typeof(req.data.roomId) !== 'undefined') {
          for (i = 0; i < data.length; i++) {
            if (data[i].id === req.data.roomId) {
              defered.resolve(data[i].messages.slice());
            }
          }
        }
      }
    }, 2000);
  }
  else if (req.type === 'POST') {
    setTimeout(function() {
      if (req.location === 'rooms'){
        var newRoom = {};
        newRoom.id = data[data.length - 1].id + 1;
        newRoom.name = req.data.roomname;
        newRoom.messages = [];
        data.push(newRoom);
        defered.resolve(newRoom);
      }
      else if (req.location === 'messages') {
        var newMessage = {};
        var lastId = -1;
        for (i = 0; i < data.length; i++){
          for (j = 0; j < data[i].messages.length; j++){
            if (data[i].messages[j].id > lastId){
              lastId = data[i].messages[j].id;
            }
          }
        }
        newMessage.id = lastId + 1;
        newMessage.username = req.data.username;
        newMessage.text = req.data.text;
        for (i = 0; i < data.length; i++) {
          if (data[i].id === req.data.roomId){
            data[i].messages.push(newMessage);
            defered.resolve(newMessage);
          }
        }
      }
    }, 2000);
  }
  else if (req.type === 'PUT') {
    setTimeout(function() {
      if (req.location === 'rooms'){
        for (i = 0; i < data.length; i++) {
          if (data[i].id === req.data.roomId) {
            data[i].name = req.data.roomname;
            defered.resolve(data[i]);
          }
        }
      }
      else if (req.location === 'messages') {
        for (i = 0; i < data.length; i++) {
          if (data[i].id === req.data.roomId){
            for (j = 0; j < data[i].messages.length; j++){
              if (data[i].messages[j].id === req.data.messageId) {
                data[i].messages[j].text = req.data.text;
                defered.resolve(data[i].messages[j]);
              }
            }
          }
        }
      }
    }, 2000);
  }
  else if (req.type === 'DELETE') {
    setTimeout(function() {
      if (req.location === 'rooms'){
        for (i = 0; i < data.length; i++) {
          if (data[i].id === req.data.roomId) {
            data.splice(i, 1);
            defered.resolve(true);
          }
        }
      }
      else if (req.location === 'messages') {
        for (i = 0; i < data.length; i++) {
          if (data[i].id === req.data.roomId){
            for (j = 0; j < data[i].messages.length; j++){
              if (data[i].messages[j].id === req.data.messageId) {
                data[i].messages.splice(j, 1);
                defered.resolve(true);
              }
            }
          }
          defered.resolve(true);
        }
      }
    }, 2000);
  }

  return defered.promise;
};

module.exports = $;
