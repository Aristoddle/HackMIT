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

import ItemEntry from './ItemEntry';
import SearchBar from './SearchBar';
import ItemSelection from './ItemSelection';
import { items } from './ItemDatasources';

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class ItemTableMin extends Component {
  constructor(props) {
    super(props);
      this.state = {
        items: [{
          type:'type',
          name:'name',
        }],
        query: '',
        filteritems: [],
        addItemName:'',
        addItemType:'',
        addItemError: false,
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

  onEditItem = (item, target) => {
    const {user} = this.props;
    var items = this.state.items;

    var itemIndex = items.findIndex( (item) => {
      return item.type + item.name == target;
    })

    if (itemIndex > -1) {
      items[itemIndex] = {
        type: item.type,
        name: item.name,
      };
    }
    this.setState({items: items});
  }

  onAddItem = () => {
    const { user } = this.props;

    const item = {
      name: this.state.addItemName,
      type: this.state.addItemType,
    }

    // check to make sure they're not null
    const err =
      (item.name === '') ||
      (item.type === '');
    if(!err) {
      // add the new item to the state to view it
      var items = this.state.items.reverse();
      items.push(item);
      this.setState({items: items.reverse()});

      // clear the display
      this.setState({
        addItemType: '',
        addItemName: '',
        query: '',
      });

    } else {
      this.setState({addItemError: true});
    }
  }

  handleType = (typeItem, value) => {
    this.setState(byPropKey(typeItem, value.value));
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
          <ItemEntry
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
          <Grid container
          justify='space-between'
          alignItems='baseline'
          direction='row'
          padding={20}
          >
            <Grid item xs >
              <div>
                <CardContent>
                  <Typography variant='caption' align='left'>Due: 12/1/2018</Typography>
                  <Typography variant='headline' align='left'>Damaged Item List</Typography>
                  <Typography variant='caption' align='left'>Please list all items damaged in the room</Typography>
                </CardContent>
              </div>
            </Grid>
            <Grid item xs >
              <div>
                <CardContent>
                  <Typography variant='caption' align='right'>Last Updated:</Typography>
                  <Typography variant='caption' align='right'>10/12/2018</Typography>
                </CardContent>
              </div>
            </Grid>
          </Grid>
          <CardContent>
            <SearchBar
              placeholder='Search items...'
              query={this.state.query}
              handleChange={(e) => {this.onSearchChange(e)}}/>
          </CardContent>

          <CardContent id='add-item' onKeyPress={
            (e) => {
              if(e.key === 'Enter') {
                this.onAddItem();
              }
            }
          }>
            <Grid container spacing={24} alignItems='center'>
              <Grid align='center' item xs={1} id='warning-flag'><Typography variant='caption'>Add item</Typography></Grid>
              <Grid item lg id='data'>
                <Input ref='nameFocus' focused={this.state.refocused} placeholder='Name' value={this.state.addItemName} onChange={
                  (e) => {this.setState({ addItemName : e.target.value })}
                } disableUnderline/>
                <Grid container id='subline'
                  justify='space-between'
                  alignItems='center'
                  direction='row'
                  padding={20}
                >
                  <Grid id='email' item xs>
                    <ItemSelection
                      typeRoom="addItemType"
                      handleItemType={this.handleType}
                      value={this.state.addItemType}
                      dataSource={items}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={2} id='buttons'>
                <Grid container spacing={24}>
                  <Grid item xs={5}/>
                  <Grid item xs={2}><IconButton onClick={this.onAddItem}><Icon>add</Icon></IconButton></Grid>
                </Grid>
              </Grid>
            </Grid>
            <br />
            <Divider />
            {this.state.addDelegateError && <Typography variant='subheading'>Error</Typography>}
          </CardContent>

          <div id='item-list'>
            { itemElement }
          </div>
        </Card>
      </div>
    );
  }
}



export default ItemTableMin;
