'use strict';

var React = require('tux/React');
var MessageStore = require('../../stores/MessageStore');
var MessageActions = require('../../actions/MessageActions');
var Messages = require('./Messages.jsx');
var MessageForm = require('./MessageForm.jsx');
var RouterState = require('tux/Router/State');

var MessageView = React.createOwnerClass({
  mixins: [
    RouterState
  ],

  getMessagesForRoom: function () {
    this.ownerProps.roomId = this.roomId();
    MessageActions.get({ roomId: this.roomId() });
  },

  getInitialState: function () {
    return {
      messages: MessageStore.all()
    };
  },

  listenerCallback: function () {
    this.setState({
      messages: MessageStore.all()
    });
  },

  connectOwnerToStore: {
    store: MessageStore,
    listener: function () {
      this.listenerCallback();
    }
  },

  componentWillMount: function () {
    this.getMessagesForRoom();
  },

  componentWillReceiveProps: function () {
    this.getMessagesForRoom();
  },

  roomId: function () {
    return parseInt(this.getParams().roomId, 10);
  },

  ownerProps: {

    createMessage: function (text, username) {
      MessageActions.create({ text: text, roomId: this.roomId, username: username });
    },

    deleteMessage: function (id) {
      MessageActions.destroy({ id: id, roomId: this.roomId });
    },

    updateMessage: function (text, id) {
      MessageActions.update({ id: id, text: text, roomId: this.roomId });
    }

  },

  render: function () {
    return (
      <div>
        <MessageForm />
        <Messages messages={this.state.messages} />
      </div>
    );
  }
});

module.exports = MessageView;
