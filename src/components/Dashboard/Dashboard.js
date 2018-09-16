import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import DashboardList from './DashboardList';

const INITIAL_STATE = {
  rooms: [
    {
      name: 'Sons Room',
      type: 'Bedroom'
    },
    {
      name: 'Master BedRoom',
      type: 'Bedroom',
    }
  ],
  items: [
      {
        name: 'Joe Fan',
        type: 'Fan',
        room: 'Sons Room',
      },
      {
        name: 'Master BR Bed',
        type: 'Bed',
        room: 'Master BedRoom',
      },
  ],
    }

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class Dashboard extends Component {

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

    render() {
        const {
        } = this.state;

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
                              <Typography variant='headline' align='left'>Dashboard</Typography>
                              <Typography variant='caption' align='left'>
                                Review what information you still need to provide here.
                              </Typography>
                            </CardContent>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container
                      spacing={24}
                      >
                        <Grid item xs={12} >
                          <div>
                            <CardContent>
                              <Typography variant='title' align='left'>Rooms</Typography>
                            </CardContent>
                          </div>
                        </Grid>
                        <Grid item xs>
                          <DashboardList
                            itemData={[
                              {
                                name: 'Placeholder',
                                type: 'teae',
                                molding: 'yes',
                                wallCovering: 'yes',
                                special: 'yes',
                              },
                              {
                                name: 'adsasda',
                                type: 'asdasd',
                                molding: 'asdasd',
                                wallCovering: 'asdasdas',
                                special: '',
                              },
                            ]}
                          />
                        </Grid>
                      </Grid>
                      <Grid container
                      spacing={24}
                      >
                        <Grid item xs={12} >
                          <div>
                            <CardContent>
                              <Typography variant='title' align='left'>Items</Typography>
                            </CardContent>
                          </div>
                        </Grid>
                        <Grid item xs>
                          <DashboardList
                            itemData={[
                              {
                                name: 'asdasdasd',
                                type: 'yeeee',
                                description: 'asdasd',
                                date: '',
                                amazon: 'asdasdasd',
                                features: 'asdasdsd',
                              },
                              {
                                name: 'dsfdfsdf',
                                type: 'asdsadasd',
                                description: 'asdasda',
                                date: 'asdasd',
                                amazon: 'asdasd',
                                features: 'adsadasd',
                              },
                            ]}
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
              </Card>
          </div>
        );
    }
}
export default Dashboard;
