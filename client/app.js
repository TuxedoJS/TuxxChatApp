'use strict';

//Define app architecture here

var architect = require('tux/Architecture').architect;

var RoomStore = require('./app/stores/RoomStore');
var MessageStore = require('./app/stores/MessageStore');

architect(RoomStore).itOutputs('rooms');
architect(MessageStore).itNeeds('rooms').itOutputs('messages');

//Define app routes here

var React = require('tux/React');
var Route = require('tux/Router/Route');
var NotFoundRoute = require('tux/Router/NotFoundRoute');
var DefaultRoute = require('tux/Router/DefaultRoute');
var Link = require('tux/Router/Link');
var RouteHandler = require('tux/Router/RouteHandler');
var run = require('tux/Router/run');

var Welcome = require('./app/components/Welcome.jsx');
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

run(routes, function (Handler) {
  React.render(<Handler />, document.getElementById("main"));
});
