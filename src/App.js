import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBGZTNbC-ju1KtmC-WDrV0Q-LRB8-sMp88",
    authDomain: "bloc-chat-76c18.firebaseapp.com",
    databaseURL: "https://bloc-chat-76c18.firebaseio.com",
    projectId: "bloc-chat-76c18",
    storageBucket: "bloc-chat-76c18.appspot.com",
    messagingSenderId: "268584792738"
  };
  firebase.initializeApp(config);

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      activeRoom: null,
      messages: {},
      roomMessages: [],
      rooms: [],
      user: ''

    }
    firebase.database().ref().once("value").then((snapshot) => { // step 1 - get data from db
      this.state.messages = snapshot.val().Messages;
      this.state.rooms = snapshot.val().rooms;
    });
    this.setActiveRoom = this.setActiveRoom.bind(this); // within constructor, binding method that depends on other methods of component or even the state
  }

  setActiveRoom(roomId){
    var roomMessages = [];
    for (var message in this.state.messages){
      if (this.state.messages[message].roomId === roomId) { //this.state.messages[message].roomId - allows me to keep the property name variable because I don't know name of every single message
        roomMessages.push(this.state.messages[message]);
      }
    }
    this.setState({activeRoom: roomId});
    this.setState({roomMessages: roomMessages});
  }

  setUser(username){
    this.setState({user: username});

  }


  render() {
    console.log(this.state);
    return (
      <div className="App">
        <div className="w-3-sidebar">
        <h1>Bloc Chat! Got something to say?</h1>
        <User user={this.state.user} setUser={(username)=>this.setUser(username)} firebase={firebase} />
        <RoomList activeRoom={this.state.activeRoom} setActiveRoom={(room)=>this.setActiveRoom(room)} firebase={firebase} />
        </div>
        <div className="messageDisplay">
        <MessageList user={this.state.user} activeRoom={this.state.activeRoom} firebase={firebase} />
        </div>
      </div>

    );
  }
}

export default App;
