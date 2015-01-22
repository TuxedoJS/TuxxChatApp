'use strict';

var RoomActions = require('../actions/RoomActions');

var ActionStores = require('tuxx/Stores/ActionStores');

var RoomStore = ActionStores.createStore({
  _rooms: [],

  getAll: function () {
    return this._rooms;
  },

  onGet: function (data) {
    this._rooms = data;
    this.emitChange();
  },

 onCreate: function (data) {
    this._rooms.push(data);
    this.emitChange();
  },

  onUpdate: function (data) {
    var rooms = this._rooms;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].id === data.id) {
        rooms[i] = data;
        break;
      }
    }
    this.emitChange();
  },

  onDestroy: function (data) {
    var rooms = this._rooms;
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].id === data.id) {
        rooms.splice(i, 1);
        break;
      }
    }
    this.emitChange();
  },

  register: function () {
    return {
      rooms: {
        get: this.onGet,
        create: this.onCreate,
        update: this.onUpdate,
        destroy: this.onDestroy
      }
    };
  }
});

module.exports = RoomStore;
