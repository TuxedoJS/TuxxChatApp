'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var MessageConstants = require('../constants/MessageConstants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var $ = require('../../helpers/AjaxHelper');

var CHANGE_EVENT = 'CHANGE';

var MessageStore = assign({}, EventEmitter.prototype, {
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

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});


AppDispatcher.register(function (payload) {
  var action = payload.action;
  var body = action.body;

  switch (action.actionType) {
    case MessageConstants.MESSAGE_GET:
      MessageStore.get(body.roomId);
      break;

    case MessageConstants.MESSAGE_CREATE:
      MessageStore.create(body.text, body.roomId, body.username);
      break;

    case MessageConstants.MESSAGE_UPDATE:
      MessageStore.update(body.text, body.roomId, body.id);
      break;

    case MessageConstants.MESSAGE_DESTROY:
      MessageStore.destroy(body.id, body.roomId);
      break;

    default:
      return true;
  }
});

module.exports = MessageStore;
