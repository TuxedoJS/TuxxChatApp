var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants = require('../constants/MessageConstants');

var MessageActions = {
  get: function (roomId) {
    AppDispatcher.handleViewAction({
      actionType: Constants.MESSAGE_GET,
      body: roomId
    });
  },
  create: function (messageInfo) {
    AppDispatcher.handleViewAction({
      actionType: Constants.MESSAGE_CREATE,
      body: messageInfo
    });
  },
  destroy: function (messageInfo) {
    AppDispatcher.handleViewAction({
      actionType: Constants.MESSAGE_DESTROY,
      body: messageInfo
    });
  },
  update: function (messageInfo) {
    AppDispatcher.handleViewAction({
      actionType: Constants.MESSAGE_UPDATE,
      body: messageInfo
    });
  }
};

module.exports = MessageActions;
