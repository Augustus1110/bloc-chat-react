import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.MessagesRef = this.props.firebase.database().ref('Messages');
    this.state = {
        Messages: [],
        newMessage: ''
  };
}

handleNewMessage(e) {
  this.setState({newMessage: e.target.value});
}

newMessageSubmit(e) {
  e.preventDefault();
  this.MessagesRef.push({content: this.state.newMessage, roomId: this.props.activeRoom, username: this.props.user ? this.props.user.displayName: "Guest"});
  this.setState({newMessage: ''});
};

componentDidMount() {
       this.MessagesRef.on('child_added', snapshot => {
        const message = snapshot.val();
        message.key = snapshot.key;
        this.setState({ Messages: this.state.Messages.concat( message ) })
       });
     }

  render() {
    return (
      <section className="messageField">
      {
        this.state.Messages.filter((message) => message.roomId == this.props.activeRoom).map((message, username) =>
       <div key={username}>
        <ol>
          {message.username}: {message.content}
        </ol>
       </div>
    )}
      <form onSubmit={(e) => this.newMessageSubmit(e)}>
        <input type="text" value={this.state.newMessage} onChange={(e) => this.handleNewMessage(e)} />
        <input type="submit" value="Send Message"/>
      </form>

      </section>
    );
  }
}

export default MessageList;
