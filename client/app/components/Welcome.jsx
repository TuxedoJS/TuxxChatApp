'use strict';

var React = require('tuxx/React');
var Link = require('tuxx/Router/Link');
var RouteHandler = require('tuxx/Router/RouteHandler');

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
