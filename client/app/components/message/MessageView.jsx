'use strict';

var React = require('react');
var MessageStore = require('../../stores/MessageStore');
var MessageActions = require('../../actions/MessageActions');
var Messages = require('./Messages.jsx');
var MessageForm = require('./MessageForm.jsx');

var MessageView = React.createClass({
  getInitialState: function () {
    return {
      messages: MessageStore.all()
    };
  },

  getDefaultProps: function() {
    return {
      roomId: 1
    };
  },

  listenerCallback: function () {
    this.setState({
      messages: MessageStore.all()
    });
  },

  componentDidMount: function () {
    MessageStore.addChangeListener(this.listenerCallback);
    MessageActions.get({ roomId: this.props.roomId });
  },

  componentWillUnmount: function () {
    MessageStore.removeChangeListener(this.listenerCallback);
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
    return (
      <div>
        <MessageForm createMessage={this.createMessage} updateMessage={this.updateMessage} />
        <Messages messages={this.state.messages} deleteMessage={this.deleteMessage} updateMessage={this.updateMessage} roomId={this.props.roomId} />
      </div>
    );
  }
});

module.exports = MessageView;
