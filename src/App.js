import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

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
  render() {
    return (
      <div className="App">
        <header>
        <h1>Bloc Chat!</h1>
        </header>
        <div>
        <RoomList firebase={firebase}/>
        </div>
      </div>
    );
  }
}
