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

import RoomSelection from './RoomSelection';
import { rooms } from './RoomDatasources';
import ItemTableMin from '../Items/ItemTableMin';
import RouteButton from '../RouteButton';
import * as routes from '../../constants/routes';

import {addRoom} from '../../firebase/database/databaseApi';

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class RoomDetail extends Component {

    constructor(props) {
        super(props);
        this.style = {
          TextField: {
            fourColumn: {
              'width': '100%',
              'marginRight': '5%',
              'marginBottom': '5%',
            },
            twoColumn: {
              'width': '100%',
              'marginRight': '5%',
              'marginBottom': '5%',
            },
          },
          Button: {
            cornerBottom: {
              'marginBottom':'10px',
              'marginLeft':'auto',
            },
          },
        };
        this.state = {
            userEmail: '',
            roomName: '',
            roomType: '',
            molding: '',
            wallCovering: '',
            special: '',
        };
    }

    handlePreferences = (typeCommittee, value) => {
      this.setState(byPropKey(typeCommittee, value.value));
    };

    componentWillReceiveProps(nextProps) {
      var roomIndex = nextProps.rooms.findIndex((roomInstance) => {
        return nextProps.room == roomInstance.roomName;
      });
      var room = nextProps.rooms[roomIndex];
      this.setState({
        userEmail: nextProps.user.email,
        roomName: room.roomName,
        roomType: room.roomType,
        molding: room.molding,
        wallCovering: room.wallCovering,
        special: room.special,
        rooms: this.props.rooms,
        items: this.props.items,
      });
    }


    onSubmit = () => {
      var {user} = this.props;
      addRoom(user,
          {
              userEmail: user.email,
              roomName: this.state.roomName,
              roomType: this.state.roomType,
              molding: this.state.molding,
              wallCovering: this.state.wallCovering,
              special: this.state.special,
          });
    }

    render() {
        var roomName = "Joe's room";
        var {room, user, items} = this.props;
        var new_items = items = items ? items.filter((item) => {return item.roomName == room}) : null;

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
                              <Typography variant='headline' align='left'>{roomName}</Typography>
                              <Typography variant='caption' align='left'>
                                Please fill in additional information about the damaged room!
                              </Typography>
                            </CardContent>
                          </div>
                        </Grid>
                      </Grid>
                      <br/>
                      <br/>
                      <Grid container
                        spacing={24}>
                        <Grid item xs={12}>
                          <Typography variant="subheading"
                            align="left">
                              What type of room is/was this room?
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <RoomSelection
                            selectedCountries={this.state.roomType}
                            typeRoom="roomType"
                            handlePreferences={this.handlePreferences}
                            dataSource={rooms}/>
                        </Grid>
                        <Grid item xs={12}>

                          <Typography
                                                    variant='subheading'
                                                    align='left'>
                                                    Is/was there crown molding?
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <TextField
                                                    id='molding'
                                                    style={this.style.TextField.fourColumn}
                                                    label='Crown Molding'
                                                    value={this.state.molding}
                                                    onChange={(e) => this.setState(byPropKey('molding', e.target.value))}
                                                    type='text'
                                                    helperText='Required'
                                                  />
                                                </Grid>

                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant='subheading'
                                                    align='left'>
                                                    Is/were there wall coverings?  If so, what type?
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <TextField
                                                    id='wallCovering'
                                                    style={this.style.TextField.fourColumn}
                                                    label='Wall Covering Info'
                                                    value={this.state.wallCovering}
                                                    onChange={(e) => this.setState(byPropKey('wallCovering', e.target.value))}
                                                    type='text'
                                                    helperText='Required'
                                                  />
                                                </Grid>

                                                <Grid item xs={12}>
                                                  <Typography
                                                    variant='subheading'
                                                    align='left'>
                                                    Are/were there any special details or architectural features?
                                                  </Typography>
                                                </Grid>
                                                <Grid item xs={12}>
                                                  <TextField
                                                    id='special'
                                                    style={this.style.TextField.fourColumn}
                                                    label='Special Features'
                                                    value={this.state.special}
                                                    onChange={(e) => this.setState(byPropKey('special', e.target.value))}
                                                    type='text'
                                                    helperText='Required'
                                                  />
                                                </Grid>
                        <Grid item xs={12}>
                          <ItemTableMin
                            room={this.props.room}
                            loadedItem={true}
                            user={user}
                            itemData={new_items}
                          />
                        </Grid>
                      </Grid>

                      <Grid container spacing={24}>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2}>
                          <RouteButton
                            route={routes.ITEM_INFO_UPDATE_WO_PARAM + room}
                            onSubmit={this.onSubmit}>
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
export default RoomDetail;
