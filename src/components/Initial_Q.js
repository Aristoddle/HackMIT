import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';


import * as routes from '../constants/routes';
import RouteButton from './RouteButton';
import {addUserInfo} from '../firebase/database/databaseApi';

const INITIAL_STATE = {
      walls: '',
      roof: '',
      cost: '',
      footage: '',
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
        this.state = {...INITIAL_STATE}
    }

    handlePreferences = (typeRoom, value) => {
      this.setState(byPropKey(typeRoom, value));
    };

    onSubmit = () => {
      var {user} = this.props;
      addUserInfo(user, this.state);
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
                              <Typography variant='headline' align='left'>Basic Information</Typography>
                              <Typography variant='caption' align='left'>
                                We will use this information to help you create your claim.
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
                          <Typography
                            variant='subheading'
                            align='left'>
                            How many visible external walls are damaged?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='walls'
                            style={this.style.TextField.fourColumn}
                            label='Number of Walls'
                            value={this.state.walls}
                            onChange={(e) => this.setState(byPropKey('walls', e.target.value))}
                            type='text'
                            helperText='Required'
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            variant='subheading'
                            align='left'>
                            Is there roof damage?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='roof'
                            style={this.style.TextField.fourColumn}
                            label='Roof Damage?'
                            value={this.state.roof}
                            onChange={(e) => this.setState(byPropKey('roof', e.target.value))}
                            type='text'
                            helperText='Required'
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            variant='subheading'
                            align='left'>
                            What is/was the value of your house?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='cost'
                            style={this.style.TextField.fourColumn}
                            label='Cost of House'
                            value={this.state.cost}
                            onChange={(e) => this.setState(byPropKey('cost', e.target.value))}
                            type='text'
                            helperText='Required'
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            variant='subheading'
                            align='left'>
                            What is/was the square footage of your house?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='footage'
                            style={this.style.TextField.fourColumn}
                            label='Square Footage'
                            value={this.state.footage}
                            onChange={(e) => this.setState(byPropKey('footage', e.target.value))}
                            type='text'
                            helperText='Required'
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <Typography
                            variant='subheading'
                            align='left'>
                            How many rooms are damaged/destroyed in your house?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='rooms'
                            style={this.style.TextField.fourColumn}
                            label='Number of Rooms'
                            value={this.state.rooms}
                            onChange={(e) => this.setState(byPropKey('rooms', e.target.value))}
                            type='text'
                            helperText='Required'
                          />
                        </Grid>

                      </Grid>

                      <Grid container spacing={24}>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2}>
                          <RouteButton
                            route={routes.ROOM_SUMM_Q}
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
export default Initial_Q;
