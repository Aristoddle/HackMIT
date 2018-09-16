import React, {Component} from 'react';

import Button from '@material-ui/core/Button';


import * as routes from '../constants/routes';
import { withRouter } from 'react-router-dom';

class RouteButton extends Component {

  handleClick = () => {
    var { onSubmit, history, route } = this.props;
    onSubmit();
    history.push(route);
  }

  render() {
    return <Button
      onClick={this.handleClick}
      >Submit</Button>;
  }
}

export default withRouter(RouteButton);
