'use strict';

var React = require('tuxx/React');
var Link = require('tuxx/Router/Link');

var Room = React.createMutableClass({
  displayName: 'Room',

  anyPropTypes: {
    room: React.PropTypes.object.isRequired,
    deleteRoom: React.PropTypes.func.isRequired,
    updateRoom: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {
      editing: false,
      message: ''
    };
  },

  deleteRoom: function (e) {
    e.preventDefault();
    this.nearestOwnerProps.deleteRoom(this.props.room.id);
  },

  updateRoom: function (e) {
    e.preventDefault();
    this.nearestOwnerProps.updateRoom(this.state.message, this.props.room.id);
  },

  componentWillReceiveProps: function () {
    this.setState({editing : false});
  },

  edit: function (e) {
    e.preventDefault();
    this.setState({
      editing: !this.state.editing,
      message: this.props.room.name
    });
  },

  handleChange: function (event) {
    this.setState({message: event.target.value});
  },

  render: function () {
    var roomContent;
    if (this.state.editing) {
      roomContent = (
        <form onSubmit={this.updateRoom}>
          <input ref="roomName" type="text" value={this.state.message} onChange={this.handleChange} />
          <button type="button" onClick={this.edit}>Cancel</button>
          <button type="submit">Edit</button>
        </form>
      );
    }
    else {
      roomContent = (
        <div>
          <Link to="rooms.room" params={{roomId: this.props.room.id}}>{this.props.room.name}</Link>
          <button onClick={this.edit}>Edit</button>
          <button onClick={this.deleteRoom}>Delete</button>
        </div>
      );
    }
    return roomContent;
  }
});

module.exports = Room;
