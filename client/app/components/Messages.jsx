var React = require('react');
var Message = require('./Message.jsx');
var SampleData = require('../../SampleData.js');

var Messages = React.createClass({

	getIntialState: function(){
    messages: rooms
	},
  // componentDidMount: function() {
  //   MessageStore.addChangeListener();
  // },
  render: function () {
    var messages = [];
    SampleData.forEach(function(room){
      room.messages.forEach(function(message){
        messages.push(<Message key={message.id} username={message.username} text={message.text}/>);
      })
    })
    return (
      <div>
        {messages}
      </div>
    );
  }
});

module.exports = Messages;
