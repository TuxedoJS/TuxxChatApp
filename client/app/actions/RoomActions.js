'use strict';

var $ = require('../../helpers/AjaxHelper');
var Actions = require('tuxx/Actions');

var RoomActions = Actions.createActionCategory({
  category: 'rooms',
  source: 'view_component',
  actions: ['create', 'get', 'update', 'destroy']
});

RoomActions.before('get', function (dispatch) {
  $.ajax({
    type: 'GET',
    location: 'rooms',
    data: {}
  })
  .then(function (data) {
    dispatch(data);
  });
});

RoomActions.before('create', function (dispatch, actionBody) {
  $.ajax({
    type: 'POST',
    location: 'rooms',
    data: {
      roomname: actionBody.name
    }
  })
  .then(function (data) {
    dispatch(data);
  });
});

RoomActions.before('update', function (dispatch, actionBody) {
  $.ajax({
    type: 'PUT',
    location: 'rooms',
    data: {
      roomname: actionBody.name,
      roomId: actionBody.id
    }
  })
  .then(function (data) {
    dispatch(data);
  });
});

RoomActions.before('destroy', function (dispatch, actionBody) {
  $.ajax({
    type: 'DELETE',
    location: 'rooms',
    data: {
      roomId: actionBody.id
    }
  })
  .then(function () {
    dispatch({
      id: actionBody.id
    });
  });
});

module.exports = RoomActions;
