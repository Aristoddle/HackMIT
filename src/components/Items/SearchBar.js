// Copyright 2018 Daniel Keller and Brian Kitano

import React, {Component} from 'react';

import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';
import TextField from '@material-ui/core/TextField';

class SearchBar extends Component {

  render() {
    const { handleChange } = this.props;
    return (
    <div>
      <TextField
      placeholder={this.props.placeholder}
      onChange={(e) => {handleChange(e)}}
      value={this.props.query}
      InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon>search</Icon>
            </InputAdornment>
          ),
        }}/>
    </div>
    )
  }
}

export default SearchBar;
