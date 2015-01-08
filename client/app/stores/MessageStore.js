'use strict';

var $ = require('../../helpers/AjaxHelper');
var Stores = require('tux/Stores');
var MessageActions = require('../actions/MessageActions');

var MessageStore = Stores.createStore({
  _messages: [],

  all: function () {
    return this._messages;
  },

  get: function (roomId) {
    $.ajax({
      type: 'GET',
      data: { roomId: roomId },
      location: 'messages'
    })
      .then(function (data) {
        this._messages = data;
        this.emitChange();
      }.bind(this));
  },

  create: function (text, roomId, username) {
    $.ajax({
      type: 'POST',
      location: 'messages',
      data: {
        text: text,
        roomId: roomId,
        username: username
      }
    })
      .then( function(data) {
        this._messages.push(data);
        this.emitChange();
      }.bind(this));
  },

  destroy: function (id, roomId) {
    $.ajax({
      type: 'DELETE',
      location: 'messages',
      data: {
        messageId: id,
        roomId: roomId
      }
    })
      .then(function (data) {
        for (var i = 0; i < this._messages.length; i++) {
          if (this._messages[i].id === id) {
            this._messages.splice(i, 1);
            break;
          }
        }
        this.emitChange();
      }.bind(this));
  },

  update: function (text, roomId, messageId) {
    $.ajax({
      type: 'PUT',
      location: 'messages',
      data: {
        text: text,
        roomId: roomId,
        messageId: messageId
      }
    })
      .then(function (data) {
        for (var i = 0; i < this._messages.length; i++) {
          if (this._messages[i].id === data.id) {
            this._messages[i] = data;
            break;
          }
        }
        this.emitChange();
      }.bind(this));
  },
});

MessageActions.register(MessageStore, {
  get: function (body) {
    MessageStore.get(body.roomId);
  },

  create: function (body) {
    MessageStore.create(body.text, body.roomId, body.username);
  },

  destroy: function (body) {
    MessageStore.destroy(body.id, body.roomId);
  },

  update: function (body) {
    MessageStore.update(body.text, body.roomId, body.id);
  }
});

module.exports = MessageStore;
