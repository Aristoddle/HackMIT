// Copyright 2018 Daniel Keller and Brian Kitano

import React, {Component} from 'react';


import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';


class ItemEntry extends Component {
  constructor(props) {
      super(props);
      this.state = {
        editItemName: props.item.name,
        editItemType: props.item.type,
        addItemError: false,
        editMode: false,
        modalOpen: false,
      };
  }

  handleEdit = () => {
    this.setState({editMode: true});
  }

  submitEdit = (target) => {
    const {
      user,
      handleEditItem,
      item
    } = this.props;

    var newitem = {
      type: this.state.editItemType,
      name: this.state.editItemName,
    };

    handleEditItem(newitem, target);

    this.setState({editMode: false});
  }

  render () {
    const { item, user } = this.props;
    if (this.state.editMode === false) {
      return (
      <CardContent id={item.uid}>
        <Grid container spacing={24} alignItems='center'>
            <Grid item xs={1}></Grid>

          <Grid item lg className='data'>
            <Typography className='name' variant='subheading'>{item.name}</Typography>

            <Grid container className='subline'
              justify='space-between'
              alignItems='center'
              direction='row'
              padding={20}
            >
              <Grid className='email' item xs>
                <Typography align='left' variant='body1'>{item.type}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} className='buttons'>
            <Grid container justify='center' alignItems='center' direction='row'>
              <Grid item xs>
              </Grid>
              <Grid item xs><IconButton onClick={this.handleEdit}>
                <Icon>edit</Icon></IconButton></Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Divider />
      </CardContent> );
    } else {
      return <CardContent className='add-item' onKeyPress={
        (e) => {
          if(e.key === 'Enter') {
            this.submitEdit();
          }
        }
      }>
        <Grid container spacing={24} alignItems='center'>
          <Grid
            align='center'
            item xs={1}
            className='warning-flag'><Typography variant='caption'>Edit</Typography></Grid>
          <Grid item lg className='data'>
            <Input
              ref='nameFocus'
              focused={this.state.refocused}
              placeholder='Name'
              value={this.state.editItemName}
              onChange={(e) => {this.setState({ editItemName : e.target.value })}
            } disableUnderline/>
            <Grid container className='subline'
              justify='space-between'
              alignItems='center'
              direction='row'
              padding={20}
            >
              <Grid className='email' item xs>
                <Input
                  placeholder='Type'
                  value={this.state.editItemType}
                  onChange={(e) => {this.setState({editItemType:e.target.value});
                  }
                }
                disableUnderline/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2} className='buttons'>
            <Grid container justify='center' alignItems='center' direction='row'>
              <Grid item xs>
              </Grid>
              <Grid item xs><IconButton onClick={() => {this.submitEdit(item.type + item.name)}}><Icon>check</Icon></IconButton></Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Divider />
      </CardContent>;
    }
  }
}

export default ItemEntry;
