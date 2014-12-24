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

  getMessagesForRoom: function (id) {
    id = parseInt(this.getParams().roomId, 10);
    MessageStore.get(id);
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

  createMessage: function (text, roomId, username) {
    MessageActions.create({ text: text, roomId: roomId, username: username });
  },

  deleteMessage: function (id, roomId) {
    MessageActions.destroy({ id: id, roomId: roomId });
  },

  updateMessage: function (text, roomId, id) {
    MessageActions.update({ id: id, text: text, roomId: roomId });
  },

  render: function () {
    var roomId = this.getParams().roomId;
    return (
      <div>
        <MessageForm createMessage={this.createMessage} updateMessage={this.updateMessage} roomId={roomId} />
        <Messages messages={this.state.messages} deleteMessage={this.deleteMessage} updateMessage={this.updateMessage} roomId={roomId} />
      </div>
    );
  }
});

module.exports = MessageView;
