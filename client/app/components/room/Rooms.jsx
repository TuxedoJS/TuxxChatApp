'use strict';

var React = require("tux/React");
var Room = require("./Room.jsx");

var Rooms = React.createOwneeClass({
  propTypes: {
    rooms: React.PropTypes.array.isRequired
  },

  render: function() {
    var roomComponents = this.props.rooms.map(function(room) {
      return <Room key={room.id} room={room} />;
    })
    return (
      <div>
        { roomComponents }
      </div>
    );
  }
});

module.exports = Rooms;
