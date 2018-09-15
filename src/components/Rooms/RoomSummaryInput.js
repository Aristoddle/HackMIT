import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';



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
      var {roomNumber, handleRoomNumberChange} = this.props;

        return (
          <div>
                        <Grid item xs={12}>
                          <Typography
                            variant='subheading'
                            align='left'>
                            How do you refer to room number {roomNumber}?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='walls'
                            style={this.style.TextField.fourColumn}
                            label={'Room Name ' + roomNumber}
                            value={this.state.roomNames[n]}
                            onChange={(e) => {
                              this.handleRoomNumberChange(roomNumber, e.target.value);
                            }}
                            type='text'
                            helperText='Required'
                          />
                        </Grid>
          </div>
        );
    }
}
export default RoomSummaryInput;
