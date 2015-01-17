'use strict';

var React = require("tux/React");
var RoomStore = require("../../stores/RoomStore.js");
var RoomActions = require("../../actions/RoomActions.js");
var Rooms = require("./Rooms.jsx");
var RoomCreateForm = require("./RoomCreateForm.jsx");
var RouterState = require('tux/Router/State');
var RouteHandler = require('tux/Router/RouteHandler');

var RoomView = React.createOwnerClass({
  mixins: [
    RouterState
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

  connectOwnerToStore: {
    store: RoomStore,
    listener: function() {
      this.listenerCallback();
    }
  },

  componentDidMount: function() {
    RoomActions.get();
  },

  componentWillUnmount: function() {
    RoomStore.removeChangeListener(this.listenerCallback);
  },

  ownerProps: {

    createRoom: function(name) {
      RoomActions.create({name: name});
    },

    deleteRoom: function(id) {
      RoomActions.destroy({id: id});
    },

    updateRoom: function(name, id) {
      RoomActions.update({name:name, id:id});
    }
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
        <RoomCreateForm />
        <h1>{roomName ? 'You are in room: ' + roomName : "Click a room name to continue"}</h1>
        <Rooms rooms={this.state.rooms} />
        <RouteHandler />
      </div>
    );
  }

});

module.exports = RoomView;
