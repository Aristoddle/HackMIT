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
import Initial_Q from './components/Initial_Q';
import RoomSummary from './components/Rooms/RoomSummary';
import RoomDetail from './components/Rooms/RoomDetail';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <div>
          <Route exact path={routes.SIGN_UP} component={SignUp}/>
          <Route exact path={routes.LOGIN} component={Login}/>
          <Route exact path={routes.INITIAL_Q} component={Initial_Q}/>
          <Route exact path={routes.ROOM_SUMM_Q} component={RoomSummary}/>
          <Route exact path={routes.ROOM_DETAIL_Q} component={RoomDetail}/>
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default App;
