'use strict';

var TuxActions = require("tux/Actions");

var RoomActions = TuxActions.createActionCategory({
  category: 'rooms',
  source: 'view_component',
  actions: ['create', 'get', 'update', 'destroy']
});

module.exports = RoomActions;
