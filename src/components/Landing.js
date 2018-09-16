import React, {Component} from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';

import * as routes from '../constants/routes';


class Landing extends Component {
    render() {
        return (
            <div>
                <Typography variant='body1'>Landing</Typography>
                <Button variant='outlined'><Link to={routes.LOGIN} style={{textDecoration : 'none',}}>Login</Link> </Button>
                <Button variant='outlined'><Link to={routes.SIGN_UP} style={{textDecoration : 'none',}}>Sign Up</Link> </Button>
            </div>
        )
    }
}

export default Landing;