'use strict';

var React = require('react');
var Welcome = require('./app/components/Welcome.jsx');
var rooms = require('./SampleData.js');
var Router = require('react-router');
var Route = Router.Route;
var NotFoundRoute = Router.NotFoundRoute;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var RouteHandler = Router.RouteHandler;
var NotFound = require('./app/components/routes/NotFound.jsx');
var MessageView = require('./app/components/message/MessageView.jsx');
var RoomView = require('./app/components/room/RoomView.jsx');
var DefaultWelcome = require('./app/components/DefaultWelcome.jsx');


var routes = (
  <Route name="app" path="/" handler={Welcome}>
    <DefaultRoute handler={DefaultWelcome} />
    <Route name="rooms" path="/rooms" handler={RoomView}>
      <Route name="rooms.room" path="/rooms/:roomId" handler={MessageView} />
    </Route>
    <NotFoundRoute handler={NotFound} />
  </Route>
);

Router.run(routes, function(Handler) {
  React.render(<Handler />, document.getElementById("main"));
});
