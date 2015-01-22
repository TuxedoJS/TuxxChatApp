'use strict';

var React = require('tuxx/React');
var MessageStore = require('../../stores/MessageStore');
var MessageActions = require('../../actions/MessageActions');
var Messages = require('./Messages.jsx');
var MessageForm = require('./MessageForm.jsx');
var RouterState = require('tuxx/Router/State');

var MessageView = React.createOwnerClass({
  mixins: [
    RouterState
  ],

  getMessagesForRoom: function () {
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

  connectOwnerToStore: function () {
    return {
      store: MessageStore,
      listener: function () {
        this.listenerCallback();
      }.bind(this)
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

  registerOwnerProps: function () {
    return {
      createMessage: function (text, username) {
        MessageActions.create({ text: text, roomId: this.roomId(), username: username });
      }.bind(this),

      deleteMessage: function (id) {
        MessageActions.destroy({ id: id, roomId: this.roomId() });
      }.bind(this),

      updateMessage: function (text, id) {
        MessageActions.update({ id: id, text: text, roomId: this.roomId() });
      }.bind(this)
    };
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
