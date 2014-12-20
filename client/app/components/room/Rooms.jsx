'use strict';

var React = require("react");
var Room = require("./Room.jsx")

var Rooms = React.createClass({
  propTypes: {
    rooms: React.PropTypes.array.isRequired,
    deleteRoom: React.PropTypes.func,
    updateRoom: React.PropTypes.func
  },

  render: function() {
    var rooms = this.props.rooms;
    var roomComponents = [];

    for (var i = 0; i < rooms.length; i++) {
      roomComponents.push(<Room key={rooms[i].id} deleteRoom={this.props.deleteRoom} updateRoom={this.props.updateRoom} room={rooms[i]} />);
    }
    return (
      <div>
        { roomComponents }
      </div>
    );
  }
});

module.exports = Rooms;
