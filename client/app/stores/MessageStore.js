'use strict';

var MessageActions = require('../actions/MessageActions');

var ActionStores = require('tuxx/Stores/ActionStores');

var MessageStore = ActionStores.createStore({
  _messages: [],

  all: function () {
    return this._messages;
  },

  onGet: function (data) {
    this._messages = data;
    this.emitChange();
  },

  onCreate: function (data) {
    this._messages.push(data);
    this.emitChange();
  },

  onDestroy: function (data) {
    for (var i = 0; i < this._messages.length; i++) {
      if (this._messages[i].id === data.id) {
        this._messages.splice(i, 1);
        break;
      }
    }
    this.emitChange();
  },

  onUpdate: function (data) {
    for (var i = 0; i < this._messages.length; i++) {
      if (this._messages[i].id === data.id) {
        this._messages[i] = data;
        break;
      }
    }
    this.emitChange();
  },

  register: function () {
    return {
      message: {
        get: this.onGet,
        create: this.onCreate,
        destroy: this.onDestroy,
        update: this.onUpdate
      }
    };
  }
});

module.exports = MessageStore;
