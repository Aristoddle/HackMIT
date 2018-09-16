import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';



class RoomSummaryInput extends Component {

    constructor(props) {
        super(props);
        this.style = {
          TextField: {
            fourColumn: {
              'width': '100%',
              'marginRight': '5%',
              'marginBottom': '5%',
            },
          },
        };
    }

    render() {
      var {roomNames, roomNumber, handleRoomNumberChange} = this.props;

        return (
          <Grid container spacing={24}>
                        <Grid item xs={12}>
                          <Typography
                            variant='subheading'
                            align='left'>
                            How do you refer to room number {roomNumber}?
                          </Typography>
                        </Grid>
                        <Grid item xs={10}>
                          <TextField
                            id='walls'
                            style={this.style.TextField.fourColumn}
                            label={'Room Name ' + roomNumber}
                            value={roomNames[roomNumber]}
                            onChange={(e) => {
                              handleRoomNumberChange(roomNumber, e.target.value);
                            }}
                            type='text'
                            helperText='Required'
                          />
                        </Grid>
                        <br/>
          </Grid>
        );
    }
}
export default RoomSummaryInput;
