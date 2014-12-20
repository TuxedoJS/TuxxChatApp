'use strict';

var RoomConstants = require("../constants/RoomConstants.js");
var AppDispatcher = require("../dispatcher/AppDispatcher.js");

var RoomActions = {
  create: function(roomInfo) {
    AppDispatcher.handleViewAction({
      actionType: RoomConstants.ROOM_CREATE,
      body: roomInfo
    });
  },
  get: function(roomInfo) {
    AppDispatcher.handleViewAction({
      actionType: RoomConstants.ROOM_GET,
      body: roomInfo
    });
  },
  update: function(roomInfo) {
    AppDispatcher.handleViewAction({
      actionType: RoomConstants.ROOM_UPDATE,
      body: roomInfo
    });
  },
  destroy: function(roomInfo) {
    AppDispatcher.handleViewAction({
      actionType: RoomConstants.ROOM_DESTROY,
      body: roomInfo
    });
  }
};

module.exports = RoomActions;
