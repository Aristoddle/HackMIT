// Copyright 2018 Daniel Keller and Brian Kitano

import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';

import DashboardEntry from './DashboardEntry';
import SearchBar from '../Items/SearchBar';

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class DashboardList extends Component {
  constructor(props) {
    super(props);
      this.state = {
        items: [{
          type:'type',
          name:'name',
        }],
        query: '',
        filteritems: [],
      };
  }

  componentWillMount() {
    const {itemData} = this.props;
    this.setState({items: itemData, filteritems: itemData});
  }

  componentDidMount() {
    const {itemData} = this.props;
    this.setState({items: itemData, filteritems: itemData});
  }

  onSearchChange = (e) => {
    this.setState({'query':e.target.value});
    var query = e.target.value;
    var filterList = this.state.items;
    if (filterList && filterList.length > 0) {
      filterList = filterList.filter( (item) => {
        return item.name.toLowerCase().search(query.toLowerCase()) !== -1;
      }
    )}
    this.setState({filteritems: filterList});
  };

  render() {
    const {user, loadedItem} = this.props;
    var itemElement =
      <CardContent>
        <Typography variant='headline'>
          Loading...
        </Typography>
      </CardContent>;
    if(this.state.filteritems && this.state.filteritems.length > 0 ) {
      itemElement = this.state.filteritems.map((item) => {
        return (
          <DashboardEntry
            key={item.type + item.name}
            item={item}
            handleEditItem={this.onEditItem}
            user={user}
          />
        );
      })
    } else if (loadedItem) {
      itemElement =
        <CardContent>
          <Typography variant='headline'>
            No items Yet
          </Typography>
        </CardContent>;
    }

    return (
      <div>
        <Card>
          <CardContent>
            <SearchBar
              placeholder='Search items...'
              query={this.state.query}
              handleChange={(e) => {this.onSearchChange(e)}}/>
          </CardContent>

          <div id='item-list'>
            { itemElement }
          </div>
        </Card>
      </div>
    );
  }
}



export default DashboardList;
