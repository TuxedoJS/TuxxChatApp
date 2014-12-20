'use strict';

var Flux = require("flux");
var objectAssign = require("object-assign");

var AppDispatcher = objectAssign(new Flux.Dispatcher(), {
  handleViewAction: function(action) {
    this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
});

module.exports = AppDispatcher;
