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

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Route exact path={routes.LANDING} component={Landing}/>
          <Route exact path={routes.SIGN_UP} component={SignUp}/>
          <Route exact path={routes.LOGIN} component={Login}/>
          <Route exact path={routes.INITIAL_Q} component={Initial_Q}/>
        </HashRouter>
      </div>
    );
  }
}

export default App;
