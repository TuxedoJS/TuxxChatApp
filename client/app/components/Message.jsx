var React = require('react');
var Message = React.createClass({

  render: function () {
    return (
      <div>
        <h1>{this.props.username}</h1> - <p> {this.props.text}</p>
      </div>
    );
  }
});

module.exports = Message;
