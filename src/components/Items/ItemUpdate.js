import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

const INITIAL_STATE = {
      description: '',
      date: '',
      amazon: '',
      features: '',
    }

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class ItemUpdate extends Component {

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
          itemName,
          itemType
        } = this.props;

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
                              <Typography variant='title' align='left'>{itemName + ' Info'}</Typography>
                              <Typography variant='caption' align='left'>{itemType}</Typography>
                            </CardContent>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid container
                        spacing={24}>
                        <Grid item xs={12}>
                          <TextField
                            id='description'
                            style={this.style.TextField.fourColumn}
                            label='Description'
                            value={this.state.description}
                            onChange={(e) => {
                              this.setState(byPropKey('description', e.target.value));

                            }}
                            type='text'
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id='date'
                            style={this.style.TextField.fourColumn}
                            label='Approximate Date of Purchase'
                            value={this.state.date}
                            onChange={(e) => {
                              this.setState(byPropKey('date', e.target.value))
                          }}
                            type='text'
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id='amazon'
                            style={this.style.TextField.fourColumn}
                            label='Amazon Link to Replacement'
                            value={this.state.amazon}
                            onChange={(e) => {
                              this.setState(byPropKey('amazon', e.target.value))
                            }}
                            type='text'
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            id='features'
                            style={this.style.TextField.fourColumn}
                            label='Features'
                            value={this.state.features}
                            onChange={(e) => {
                              this.setState(byPropKey('features', e.target.value))
                            }}
                            type='text'
                            helperText='The more detailed you can be, the better.'
                          />
                        </Grid>
                      </Grid>
                    </CardContent>
              </Card>
          </div>
        );
    }
}
export default ItemUpdate;
