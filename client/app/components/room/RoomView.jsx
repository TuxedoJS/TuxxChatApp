'use strict';

var React = require("tuxx/React");
var RoomStore = require("../../stores/RoomStore.js");
var RoomActions = require("../../actions/RoomActions.js");
var Rooms = require("./Rooms.jsx");
var RoomCreateForm = require("./RoomCreateForm.jsx");
var RouterState = require('tuxx/Router/State');
var RouteHandler = require('tuxx/Router/RouteHandler');

var RoomView = React.createOwnerClass({
  mixins: [
    RouterState
  ],

  getInitialState: function () {
    return {
      rooms: RoomStore.getAll()
    };
  },

  listenerCallback: function () {
    this.setState({
      rooms: RoomStore.getAll()
    });
  },

  connectOwnerToStore: function () {
    return {
      store: RoomStore,
      listener: function () {
        this.listenerCallback();
      }.bind(this)
    };
  },

  componentWillMount: function () {
    RoomActions.get();
  },

  registerOwnerProps: function () {
    return {
      createRoom: function (name) {
        RoomActions.create({name: name});
      },

      deleteRoom: function (id) {
        RoomActions.destroy({id: id});
      },

      updateRoom: function (name, id) {
        RoomActions.update({name:name, id:id});
      }
    };
  },

  render: function () {
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
        <Rooms rooms={this.state.rooms} />
        <br />
        <br />
        <h1>{roomName ? 'You are in room: ' + roomName : "Click a room name to continue"}</h1>
        <br />
        <RouteHandler />
      </div>
    );
  }

});

module.exports = RoomView;
