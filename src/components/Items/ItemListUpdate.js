import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import ItemUpdate from './ItemUpdate';
import {addItem} from '../../firebase/database/databaseApi';

const INITIAL_STATE = {
      items: [],
    }

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class ItemListUpdate extends Component {

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
      var user = this.props;
      this.state.items.map((item) => {
        addItem(user, item);
      });
    }

    handleChange = (value, key) => {
      var items = this.state.items;
      items[key] = value;
      this.setState({items: items});
    }

    render() {
        var sampleItems = [
          {
            name: 'Joe\'s Fan',
            type: 'Fan',
          },
          {
            name: 'Master BR Bed',
            type: 'Bed',
          },
        ];

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
                              <Typography variant='headline' align='left'>Item Information</Typography>
                              <Typography variant='caption' align='left'>
                                Please fill out more information on each item!
                                The more info we have, the more money you can get!
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
                          {sampleItems.map((item) => {
                            return <ItemUpdate
                              key={item.name + item.type}
                              itemName={item.name}
                              itemType={item.type}
                              onChange={handleChange}
                            />
                          })}
                        </Grid>

                      </Grid>
                      <Grid container spacing={24}>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2}>
                          <Button onClick={this.onSubmit}>
                            Submit
                          </Button>
                        </Grid>
                      </Grid>
                    </CardContent>
              </Card>
          </div>
        );
    }
}
export default ItemListUpdate;
