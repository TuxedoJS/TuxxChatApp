var React = require('react');
var Router = require('react-router');
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;

var Welcome = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Hello World!</h1>
        <Link to="rooms">View Rooms</Link>
        <RouteHandler />
      </div>
    );
  }
});

module.exports = Welcome;
