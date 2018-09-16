import React, {Component} from 'react';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import RouteButton from '../RouteButton';

import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

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
        this.state = {items: this.props.items}
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
      var index = items.findIndex((item) => { return item.itemName == key;});
      var item = items[index];
      item.amazon = value.amazon;
      item.features = value.features;
      item.description = value.description;
      item.date = value.date;
      items[index] = item;
      this.setState({items: items});
    }

    render() {
      var { room, items } = this.props;
      var new_items = items
        ? items.filter((item) => {return item.roomName == room;})
        : [];

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
                              <Typography variant='headline' align='left'>
                                Item Information for <Link to={routes.ROOM_DETAIL_Q_WO_PARAM + room}>{room}</Link>
                              </Typography>
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
                          {new_items ? new_items.map((item) => {
                            return <ItemUpdate
                              key={item.itemName + item.type}
                              itemName={item.itemName}
                              itemType={item.itemType}
                              item={item}
                              onChange={this.handleChange.bind(this)}
                            />
                          }) : null}
                        </Grid>

                      </Grid>
                      <Grid container spacing={24}>
                        <Grid item xs={10}></Grid>
                        <Grid item xs={2}>
                          <Link to={routes.DASHBOARD}><Button onClick={this.onSubmit}>
                            Submit
                          </Button></Link>
                        </Grid>
                      </Grid>
                    </CardContent>
              </Card>
          </div>
        );
    }
}
export default ItemListUpdate;
