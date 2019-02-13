import React, {Component} from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.state = {
        rooms: []
  };
}
  componentDidMount() {
       this.roomsRef.on('child_added', snapshot => {
        const room = snapshot.val();
        room.key = snapshot.key;
         this.setState({ rooms: this.state.rooms.concat( room ) })
       });
     }

     render() {
       return (
         <section className="RoomList">
         <div className="chatrooms">
         {
         this.state.rooms.map((rooms) =>
         <div>
         {rooms.name};
         </div>
       )}
        </div>
        </section>
    );
  }
}

export default RoomList;
