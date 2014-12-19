var React = require('react');
var Messages = require('./Messages.jsx');

var Welcome = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Hello World!</h1>
        <Messages rooms={this.props.rooms}/>
      </div>
    );
  }
});

module.exports = Welcome;
