'use strict';

var $ = require('../../helpers/AjaxHelper');
var Actions = require('tux/Actions');

var MessageActions = Actions.createActionCategory({
  category: 'message',
  source: 'message_views',
  actions: ['get', 'create', 'destroy', 'update']
});

MessageActions.before('get', function (dispatch, actionBody) {
  $.ajax({
    type: 'GET',
    location: 'messages',
    data: actionBody
  })
  .then(function (data) {
    dispatch(data);
  });
});

MessageActions.before('create', function (dispatch, actionBody) {
  $.ajax({
    type: 'POST',
    location: 'messages',
    data: actionBody
  })
  .then(function (data) {
    dispatch(data);
  });
});

MessageActions.before('destroy', function (dispatch, actionBody) {
  $.ajax({
    type: 'DELETE',
    location: 'messages',
    data: {
      messageId: actionBody.id,
      roomId: actionBody.roomId
    }
  })
  .then(function () {
    dispatch({
      id: actionBody.id
    });
  });
});

MessageActions.before('update', function (dispatch, actionBody) {
  $.ajax({
    type: 'PUT',
    location: 'messages',
    data: {
      text: actionBody.text,
      roomId: actionBody.roomId,
      messageId: actionBody.id
    }
  })
  .then(function (data) {
    dispatch(data);
  });
});

module.exports = MessageActions;
