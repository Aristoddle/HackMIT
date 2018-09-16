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
                            type="Rooms"
                            itemData={this.props.rooms}
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
                            type="Items"
                            itemData={this.props.items}
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
