'use strict';

var React = require('react');

var MessageForm = React.createClass({
  propTypes: {
    createMessage: React.PropTypes.func,
    updateMessage: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      username: 'Gunnari',
      editing: false
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var messageNode = this.refs.message.getDOMNode();
    var message = messageNode.value.trim();
    var roomId = parseInt(this.props.roomId, 10);

    if (this.props.editing) {
      this.props.updateMessage(message, roomId, this.props.message.id);
      this.props.closeEditForm();
    } else {
      this.props.createMessage(message, roomId, this.props.username);
    }

    messageNode.value = '';
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder={this.props.editing ? "Edit Message": "New Message"} defaultValue={this.props.text} ref="message"></input>
        <button type='submit'>{this.props.editing ? 'Edit' : 'Add'}</button>
      </form>
    );
  }
});

module.exports = MessageForm;
