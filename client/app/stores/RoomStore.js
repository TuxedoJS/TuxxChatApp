'use strict';

var TuxStore = require("tux/Stores")
var RoomActions = require("../actions/RoomActions");
var $ = require("../../helpers/AjaxHelper.js");
var ROOMS = 'rooms';

var req = {
  type: 'GET',
  location: ROOMS,
  data: {}
};

var RoomStore = TuxStore.createStore({
  _rooms: [],

  getAll: function() {
    return this._rooms;
  },

  get: function() {
    req.type = "GET";
    $.ajax(req)
      .then(function(data) {
        this._rooms = data;
        this.emitChange();
      }.bind(this));
  },

  create: function(name) {
    req.data.roomname = name;
    req.type = "POST";
    $.ajax(req)
      .then(function(data) {
        this._rooms.push(data);
        this.emitChange();
      }.bind(this));
  },

  update: function(id, name) {
    req.data.roomname = name;
    req.data.roomId = id;
    req.type = "PUT";
    $.ajax(req)
      .then(function(data) {
        var rooms = this._rooms;
        for (var i = 0; i < rooms.length; i++) {
          if (rooms[i].id === id) {
            rooms[i] = data;
            break;
          }
        }
        this.emitChange();
      }.bind(this));
  },

  destroy: function(id) {
    req.data.roomId = id;
    req.type = "DELETE";
    $.ajax(req)
      .then(function(data) {
        var rooms = this._rooms;
        for (var i = 0; i < rooms.length; i++) {
          if (rooms[i].id === id) {
            rooms.splice(i, 1);
            break;
          }
        }
        this.emitChange();
      }.bind(this));
  }
});

RoomActions.register(RoomStore, {
  create: function(body) {
    RoomStore.create(body.name);
  },
  get: function() {
    RoomStore.get();
  },
  update: function(body) {
    RoomStore.update(body.id, body.name);
  },
  destroy: function(body) {
    RoomStore.destroy(body.id);
  }
});

module.exports = RoomStore;
