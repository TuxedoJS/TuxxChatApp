'use strict';

var React = require("react");
var RoomStore = require("../../stores/RoomStore.js");
var RoomActions = require("../../actions/RoomActions.js");
var Rooms = require("./Rooms.jsx");
var RoomCreateForm = require("./RoomCreateForm.jsx");



var RoomView = React.createClass({
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
    return (
      <div>
        <RoomCreateForm createRoom={this.createRoom} />
        <Rooms rooms={this.state.rooms} deleteRoom={this.deleteRoom} updateRoom={this.updateRoom} />
      </div>
    );
  }

});

module.exports = RoomView;
