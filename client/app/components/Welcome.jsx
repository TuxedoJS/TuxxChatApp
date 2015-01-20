'use strict';

var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Welcome = React.createClass({
  render: function () {
    return (
      <div>
        <Link to="rooms">View Rooms</Link>
        <br />
        <br />
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Welcome;
