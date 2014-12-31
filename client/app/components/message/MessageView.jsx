'use strict';

var React = require('react');
var MessageStore = require('../../stores/MessageStore');
var MessageActions = require('../../actions/MessageActions');
var Messages = require('./Messages.jsx');
var MessageForm = require('./MessageForm.jsx');
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var MessageView = React.createClass({
  mixins: [
    Router.State
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

  componentDidMount: function () {
    MessageStore.addChangeListener(this.listenerCallback);
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeListener(this.listenerCallback);
  },

  componentWillReceiveProps: function () {
    this.getMessagesForRoom();
  },

  roomId: function () {
    return parseInt(this.getParams().roomId, 10);
  },

  createMessage: function (text, username) {
    MessageActions.create({ text: text, roomId: this.roomId(), username: username });
  },

  deleteMessage: function (id) {
    MessageActions.destroy({ id: id, roomId: this.roomId() });
  },

  updateMessage: function (text, id) {
    MessageActions.update({ id: id, text: text, roomId: this.roomId() });
  },

  render: function () {
    return (
      <div>
        <MessageForm createMessage={this.createMessage} updateMessage={this.updateMessage} />
        <Messages messages={this.state.messages} deleteMessage={this.deleteMessage} updateMessage={this.updateMessage} />
      </div>
    );
  }
});

module.exports = MessageView;
