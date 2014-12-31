'use strict';

var React = require('react');

var MessageForm = React.createClass({
  propTypes: {
    createMessage: React.PropTypes.func,
    updateMessage: React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      username: 'Anonymous',
      editing: false,
      addOrEdit: 'Add'
    };
  },

  handleSubmit: function (e) {
    e.preventDefault();
    var messageNode = this.refs.message.getDOMNode();
    var message = messageNode.value.trim();

    if (this.props.editing) {
      this.props.updateMessage(message);
    } else {
      this.props.createMessage(message, this.props.username);
    }

    messageNode.value = '';
  },

  render: function () {
    return (
      <form onSubmit={this.handleSubmit}>
        <input placeholder={this.props.addOrEdit + " Message"} defaultValue={this.props.text} ref="message"></input>
        <button type='submit'>{this.props.addOrEdit}</button>
      </form>
    );
  }
});

module.exports = MessageForm;
