// packages
import React, { Component } from 'react';

import {
  Route,
  HashRouter
} from 'react-router-dom';

// constants
import { auth, db } from './firebase/firebase';
import * as routes from './constants/routes';

// route components
import Login from './components/Login';
import SignUp from './components/SignUp';
import Landing from './components/Landing';
import Initial_Q from './components/Initial_Q';
import RoomSummary from './components/Rooms/RoomSummary';
import RoomDetail from './components/Rooms/RoomDetail';
import PdfReceiver from './components/PdfReceiver';
import { byPropKey } from './constants/lib';
import ItemListUpdate from './components/Items/ItemListUpdate';
import Dashboard from './components/Dashboard/Dashboard';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged( (user) => {
      this.setState({
        'user': user,
      });
      //Listeners
      db.collection('user').doc(user.email)
        .onSnapshot((doc) => {
          this.setState({
            addtlInfo: doc.data(),
          });
        });
      db.collection('rooms')
        .where("userEmail", "==", user.email)
        .onSnapshot((snapshot) => {
          var rooms = []
          snapshot.forEach((childSnapshot) => {
            var childData = childSnapshot.data();
            rooms.push(childData);
          });
          this.setState({rooms: rooms});
        });
      db.collection('items').where("userEmail", "==", user.email)
        .onSnapshot((snapshot) => {
          var items = []
          snapshot.forEach((childSnapshot) => {
            var childData = childSnapshot.data();
            items.push(childData);
          });
          this.setState({items: items});
        });
    })
  }

  render() {
    var user = this.state.user;
    return (
      <div className="App">
        <HashRouter>
          <div>
          <Route exact path={routes.LANDING} component={Landing}/>
          <Route exact path={routes.SIGN_UP} component={SignUp}/>
          <Route exact path={routes.LOGIN} component={Login}/>
          <Route exact path={routes.INITIAL_Q} component={() => {
            return <Initial_Q user={user} addtlInfo={this.state.addtlInfo}/>;
          }}/>
          <Route exact path={routes.ROOM_SUMM_Q} component={() => {
            return <RoomSummary
                      user={user}
                      rooms={this.state.rooms}
                      addtlInfo={this.state.addtlInfo}/>;
          }}/>
          <Route path={routes.ROOM_DETAIL_Q} component={(match) => {
            return <RoomDetail
              user={user}
              room={match.match.params.room}
              rooms={this.state.rooms}
              items={this.state.items}
            />;
          }}/>
          <Route path={routes.PDF_RECEIVER} component={ (props) => {return (<PdfReceiver uid={this.state.user} {...props} />)} } />
          <Route  path={routes.ITEM_INFO_UPDATE} component={(match) => {
            return <ItemListUpdate user={user} room={match.match.params.room}/>;
          }}/>
          <Route exact path={routes.DASHBOARD} component={() => {
            return <Dashboard rooms={this.state.rooms} items={this.state.items}/>
          }}/>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
