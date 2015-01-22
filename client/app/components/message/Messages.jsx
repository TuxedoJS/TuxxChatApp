'use strict';

var React = require('tuxx/React');
var Message = require('./Message.jsx');

var Messages = React.createOwneeClass({
  propTypes: {
    messages: React.PropTypes.array.isRequired
  },

  render: function () {
    var messages = [];
    var message;

    for (var i = 0; i < this.props.messages.length; i++) {
      message = this.props.messages[i];
      messages.push(<Message key={message.id} message={message} />);
    }

    return (
      <ul>
        { messages }
      </ul>
    );
  }
});

module.exports = Messages;
