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

const INITIAL_STATE = {
      roomNames: [''] * 3,
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
        this.state = {...INITIAL_STATE}
    }

    handleRoomNumberChange(roomNumber, name) {
      var roomNames = this.state.roomNames;
      roomNames[roomNumber] = name;
      this.setState({
        roomNames: roomNames,
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
                        <RoomSummaryInput
                          roomNumber={1}
                          handleRoomNumberChange={this.handleRoomNumberChange}
                        />
                      </Grid>
                    </CardContent>
              </Card>
          </div>
        );
    }
}
export default RoomSummary;
