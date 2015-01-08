'use strict';

var Actions = require('tux/Actions');

var MessageActions = Actions.createActionCategory({
  category: 'message',
  source: 'message_views',
  actions: ['get', 'create', 'destroy', 'update']
});

module.exports = MessageActions;
