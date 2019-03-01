import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

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
    }
  }

  setActiveRoom(roomId){
    this.setState({activeRoom: roomId});
  }

  render() {
    return (
      <div className="App">
        <header>
        <h1>Bloc Chat! Wanna Talk?</h1>
        </header>
        <div>
        <RoomList activeRoom={this.state.activeRoom} setActiveRoom={(room)=>this.setActiveRoom(room)} firebase={firebase} />
        </div>
        <div>
        <MessageList activeRoom={this.state.activeRoom} firebase={firebase} />
        </div>
        </div>
    );
  }
}

export default App;
