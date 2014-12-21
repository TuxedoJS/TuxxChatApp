'use strict';

var React = require("react");
var RoomStore = require("../../stores/RoomStore.js");
var RoomActions = require("../../actions/RoomActions.js");
var Rooms = require("./Rooms.jsx");
var RoomCreateForm = require("./RoomCreateForm.jsx");
var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

var RoomView = React.createClass({
  mixins: [
    Router.State
  ],

  getInitialState: function() {
    return {
      rooms: RoomStore.getAll()
    };
  },

  listenerCallback: function() {
    this.setState({
      rooms: RoomStore.getAll()
    });
  },

  componentDidMount: function() {
    RoomStore.addChangeListener(this.listenerCallback);
    RoomActions.get();
  },

  componentWillUnmount: function() {
    RoomStore.removeChangeListener(this.listenerCallback);
  },

  createRoom: function(name) {
    RoomActions.create({name: name});
  },

  deleteRoom: function(id) {
    RoomActions.destroy({id: id});
  },

  updateRoom: function(name, id) {
    RoomActions.update({name:name, id:id});
  },

  render: function() {
    var rooms = this.state.rooms;
    var roomId = this.getParams().roomId;
    if (roomId !== undefined) {
      var roomName;
      for (var i = 0; i < rooms.length; i++) {
        if (String(rooms[i].id) === roomId) {
          roomName = rooms[i].name;
        }
      }
    }
    return (
      <div>
        <RoomCreateForm createRoom={this.createRoom} />
        <h1>{roomName ? 'You are in room: ' + roomName : "Click a room name to continue"}</h1>
        <Rooms rooms={this.state.rooms} deleteRoom={this.deleteRoom} updateRoom={this.updateRoom} />
        <RouteHandler />
      </div>
    );
  }

});

module.exports = RoomView;
