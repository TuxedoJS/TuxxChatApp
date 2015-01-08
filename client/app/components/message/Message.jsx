'use strict';

var React = require('tux/React');
var MessageForm = require('./MessageForm.jsx');

var Message = React.createMutableClass({
  propTypes: {
    message: React.PropTypes.object.isRequired,
    deleteMessage: React.PropTypes.func,
    updateMessage: React.PropTypes.func
  },

  mutableTraits: {
    props: 'text',
    state: 'editing'
  },

  getInitialState: function () {
    return {
      editing: false
    };
  },

  componentWillReceiveProps: function () {
    this.closeEditForm();
  },

  closeEditForm: function() {
    this.setState({ editing: false });
  },

  edit: function(e) {
    e.preventDefault();
    if (this.isMounted()) {
      this.setState({ editing: !this.state.editing });
    }
  },

  deleteMessage: function(e) {
    e.preventDefault();
    this.nearestOwnerProps.deleteMessage(this.props.message.id);
  },

  updateMessage: function (message) {
    this.nearestOwnerProps.updateMessage(message, this.props.message.id);
    this.closeEditForm();
  },

  render: function() {
    var editForm;
    var message = this.props.message;
    if (this.state.editing) {
      editForm = <MessageForm message={message} editing={this.state.editing} roomId={this.props.roomId} addOrEdit='Edit' />
    }

    return (
      <li key={message.id}>
        {message.username} - {message.text} <br />
        {editForm}
        <button onClick={this.deleteMessage}>Delete</button><button onClick={this.edit}>Edit</button>
      </li>
    );
  }
});

module.exports = Message;
