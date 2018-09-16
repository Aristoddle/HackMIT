// Copyright 2018 Daniel Keller and Brian Kitano

import React, {Component} from 'react';


import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';

import { Link } from 'react-router-dom';
import * as routes from '../../constants/routes';

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})


class DashboardEntry extends Component {
  constructor(props) {
      super(props);
  }

  render () {
    const { item, user, type, name, category } = this.props;
    var complete = type == 'Items'
      ? name !== '' && item.amazon !== '' && item.features !== ''
        && item.date !== '' && item.description
      : item.roomType !== '' && item.molding !== ''
        && item.wallCovering !== '' && item.special !== '';
    var route = type == 'Items'
      ? routes.ITEM_INFO_UPDATE_WO_PARAM + name
      : routes.ROOM_DETAIL_Q_WO_PARAM + name;

      return (
      <CardContent id={item.uid}>
        <Grid container spacing={24} alignItems='center'>
            <Grid item xs={1}></Grid>

          <Grid item lg className='data'>
            <Typography className='name' variant='subheading'>
              <Link to={route}>
                {name}
              </Link>
            </Typography>

            <Grid container className='subline'
              justify='space-between'
              alignItems='center'
              direction='row'
              padding={20}
            >
              <Grid className='email' item xs>
                <Typography align='left' variant='body1'>{category}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={2} className='buttons'>
            <Grid container justify='center' alignItems='center' direction='row'>
              <Grid item xs>
              </Grid>
              <Grid item xs>
                { complete ? <Icon>check</Icon> : <Icon>warning</Icon>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <br />
        <Divider />
      </CardContent> );
  }
}

export default DashboardEntry;
