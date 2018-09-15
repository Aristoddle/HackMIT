import React, {Component} from 'react';
import { withRouter, Link} from 'react-router-dom';

import * as routes from '../constants/routes';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import RoomSelection from './RoomSelection';

import CountryPreferences from './RoomDatasources';
import {
  rooms,
} from './RoomDatasources';

const INITIAL_STATE = {
      rooms: '',
    }

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class Initial_Q extends Component {

    constructor(props) {
        super(props);
        this.style = {
          fullwidth: {
            width: '100%',
          }
        }
        this.state = {...INITIAL_STATE}
    }

    handlePreferences = (typeRoom, value) => {
      this.setState(byPropKey(typeRoom, value));
    };

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        return (
          <div>
            <RoomSelection
            selectedCountries={this.state.rooms}
            typeRoom="rooms"
            handlePreferences={this.handlePreferences}
            dataSource={rooms}/>
          </div>
        );
    }
}
export default Initial_Q;
