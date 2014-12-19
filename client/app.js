var React = require('react');
var Welcome = require('./app/components/Welcome.jsx');
var rooms = require('./SampleData.js');

React.render(
  <Welcome />,
  document.getElementById('main')
);
