var React = require('react');
var Messages = require('./Messages.jsx');
var RoomView = require("./room/RoomView.jsx");

var Welcome = React.createClass({
  render: function () {
    return (
      <div>
        <RoomView />
        <h1>Hello World!</h1>
        <Messages rooms={this.props.rooms}/>
      </div>
    );
  }
});

module.exports = Welcome;
