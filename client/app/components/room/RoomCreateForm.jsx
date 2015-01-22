'use strict';

var React = require("tuxx/React");

var RoomCreateForm = React.createOwneeClass({
  handleSubmit: function(e) {
    e.preventDefault();
    this.nearestOwnerProps.createRoom(this.state.message);
    this.setState({message: ''});
  },

  getInitialState: function() {
    return {message: ''};
  },

  handleChange: function(event) {
    this.setState({message: event.target.value});
  },

  render: function() {
    var message = this.state.message;
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref="roomName" type="text" value={this.state.message} placeholder="Create Room" onChange={this.handleChange} />
        <button type="submit">Create Room</button>
      </form>
    );
  }
});

module.exports = RoomCreateForm;
