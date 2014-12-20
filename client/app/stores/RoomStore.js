'use strict';

var EventEmitter = require("events").EventEmitter;
var RoomConstants = require("../constants/RoomConstants.js");
var AppDispatcher = require("../dispatcher/AppDispatcher.js");
var objectAssign = require("object-assign");
var CHANGE_EVENT = "CHANGE";
var $ = require("../../helpers/AjaxHelper.js");
var ROOMS = 'rooms';

var req = {
  type: 'GET',
  location: ROOMS,
  data: {}
};

var RoomStore = objectAssign({}, EventEmitter.prototype, {
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
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

AppDispatcher.register(function(payload) {
  var action = payload.action;
  var body = action.body;

  switch (action.actionType) {
    case RoomConstants.ROOM_CREATE:
      return RoomStore.create(body.name);

    case RoomConstants.ROOM_GET:
      return RoomStore.get();

    case RoomConstants.ROOM_UPDATE:
      return RoomStore.update(body.id, body.name);

    case RoomConstants.ROOM_DESTROY:
      return RoomStore.destroy(body.id);

    default:
      return true;
  }
});

module.exports = RoomStore;
