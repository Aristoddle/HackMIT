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
    })
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
          <Route exact path={routes.LANDING} component={Landing}/>
          <Route exact path={routes.SIGN_UP} component={SignUp}/>
          <Route exact path={routes.LOGIN} component={Login}/>
          <Route exact path={routes.INITIAL_Q} component={() => {
            return <Initial_Q user={user}/>;
          }}/>
          <Route exact path={routes.ROOM_SUMM_Q} component={() => {
            return <RoomSummary user={user}/>;
          }}/>
          <Route exact path={routes.ROOM_DETAIL_Q} component={() => {
            return <RoomDetail user={user}/>;
          }}/>
          <Route path={routes.PDF_RECEIVER} component={ (props) => {return (<PdfReceiver uid={this.state.user} {...props} />)} } />
          <Route exact path={routes.ITEM_INFO_UPDATE} component={() => {
            return <ItemListUpdate user={user}/>;
          }}/>
          <Route exact path={routes.DASHBOARD} component={Dashboard}/>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
