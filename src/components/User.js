import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  this.usernameRef = this.props.firebase.database().ref('username');

  }

componentDidMount() {
  this.props.firebase.auth().onAuthStateChanged( user => {
    this.props.setUser(user);
  });
}

signIn() {
  const provider = new this.props.firebase.auth.GoogleAuthProvider();
  this.props.firebase.auth().signInWithPopup( provider );

}

signOut() {
  this.props.firebase.auth().signOut();

}

  render(){
    return(
      <div>
        <div>{this.props.user ? "Current User: " + this.props.user.displayName: "No user logged in"}</div>
        <input type= 'button' value='Sign In' onClick={()=>this.signIn(this)} />
        <br />
        <input type= 'button' value='Sign Out' onClick={()=>this.signOut(this)} />
      </div>

    )
  }
}

export default User;
