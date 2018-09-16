import React, {Component} from 'react';
import { withRouter, Link} from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import RoomSummaryInput from './RoomSummaryInput';

import * as routes from '../../constants/routes';
import RouteButton from '../RouteButton';

import {addRoom} from '../../firebase/database/databaseApi';

const INITIAL_STATE = {
      roomNames: [],
      roomNumber: [],
    }

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class RoomSummary extends Component {

    constructor(props) {
        super(props);
        this.style = {
          Button: {
            cornerBottom: {
              'marginBottom':'10px',
              'marginLeft':'auto',
            },
          },
        };
        this.state = {...INITIAL_STATE};
        this.handleRoomNumberChange = this.handleRoomNumberChange.bind(this);
    }

    handleRoomNumberChange(roomNumber, name) {
      var roomNames = this.state.roomNames;
      roomNames[roomNumber] = name;
      this.setState({
        roomNames: roomNames,
      });
    }

    componentWillMount() {
      var addtlInfo = this.props.addtlInfo ? this.props.addtlInfo : 0;
      var number = addtlInfo.rooms;
      var roomNames = [];
      var roomNumber = [];
      for (var i = 0; i < number; i++) {
        roomNames.push('');
        roomNumber.push(i + 1);
      }

      this.setState = {
        roomNames: roomNames,
        roomNumber: roomNumber,
      }
    }

    onSubmit = () => {
      var {user} = this.props;
      this.state.roomNames.map((name) => {
        addRoom(user,
          {
              userEmail: user.email,
              roomName: name,
              roomType: '',
              molding: '',
              wallCovering: '',
              special: '',
          }
        );
      });
    }

    render() {

        return (
          <div>
            <Card style={{width:'90%', marginLeft:'5%', marginRight:'5%'}}>
                    <CardContent>
                      <Grid container
                      justify='flex-start'
                      alignItems='baseline'
                      direction='row'
                      spacing={24}
                      >
                        <Grid item xs >
                          <div>
                            <CardContent>
                              <Typography variant='caption' align='left'>Due: 12/1/2018</Typography>
                              <Typography variant='headline' align='left'>Room Summary</Typography>
                              <Typography variant='caption' align='left'>
                                Name your rooms that have been damaged.
                              </Typography>
                            </CardContent>
                          </div>
                        </Grid>
                      </Grid>
                      <br/>
                      <br/>
                      <Grid container
                        spacing={24}>
                        {this.state.roomNumber.map((n) => {
                          return (
                            <div>
                            <RoomSummaryInput
                              roomNumber={n}
                              roomNames={this.state.roomNames}
                              handleRoomNumberChange={this.handleRoomNumberChange.bind(this)}
                            />
                            <br/>
                            </div>
                          );
                        })}
                      </Grid>

                      <Grid container spacing={24}>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2}>
                          <RouteButton onSubmit={this.onSubmit} route={routes.DASHBOARD}>
                            Submit
                          </RouteButton>
                        </Grid>
                      </Grid>
                    </CardContent>
              </Card>
          </div>
        );
    }
}
export default RoomSummary;
