import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.MessagesRef = this.props.firebase.database().ref('Messages');
    this.state = {
        Messages: []
  };
}

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
      this.state.Messages.filter((message) => message.roomId == this.props.activeRoom).map((message, index) =>
      <div key={index}>
        <ol>
          {message.content}
        </ol>
      </div>
    )}
      </section>
    );
  }
}

export default MessageList;
