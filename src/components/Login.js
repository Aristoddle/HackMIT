import React, {Component} from 'react';
import {auth} from '../firebase/firebase';

import { withRouter, Link} from 'react-router-dom';

import * as routes from '../constants/routes';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';

const INITIAL_STATE = {
            email: '',
            password1: '',
            error: null
    }

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class SignInForm extends Component {

    constructor(props) {
        super(props);
        this.style = {
          fullwidth: {
            width: '100%',
          }
        }
        this.state = {...INITIAL_STATE}
    }

    // arrow function (effectively a lambda function)
    onSubmit = (e) => {

        const { history } = this.props;

        auth.signInWithEmailAndPassword(this.state.email, this.state.password)
        .then( authUser => {
            this.setState(() => ({...INITIAL_STATE}));
            history.push(routes.HOME);
        })
        .catch( (error) => {
            this.setState( byPropKey('error', error) )
        })

        e.preventDefault();
    }

    render() {
        const {
            email,
            password,
            error
        } = this.state;

        const isInvalid = (email === '') || (password === '');

        return (
            <div>
                <TextField
                  id="emails"
                  style={this.style.fullwidth}
                  label='Email'
                  value={this.state.email}
                  onChange={ (e) => this.setState( byPropKey('email', e.target.value) ) }
                  type='text'
                />
                <br/>
                <TextField
                  id="password"
                  style={this.style.fullwidth}
                  label='Password'
                  value={password}
                  type='password'
                  onChange={(e) => {this.setState( byPropKey('password', e.target.value))}}
                />
                <br/>
                <br />
                <Button
                  style={this.style.fullwidth}
                  variant='raised' color='primary'
                  onKeyPress={
                    (e) => {
                      if(e.key === 'Enter' && !isInvalid) {
                        this.onSubmit();
                      }
                    }
                  }
                  onClick={this.onSubmit}
                  disabled={isInvalid} >
                    Sign In
                </Button>
                { error && <FormHelperText style={{'color':'#ff5722'}}>Error: { error.message }</FormHelperText> }
                <br/>
                <br />
                <Typography variant="caption">Forgot your password?  <Link to={routes.FORGOT}>Click here.</Link></Typography>
                </div>
        )
    }
}

const SignInPage = ({history}) => {
    return (
        <div>
            <Typography
              variant="display3"
              gutterBottom>
              Sign In</Typography>
            <Typography
              variant="caption">
              If you are already logged in, we are logging you in now.
              <br/>Otherwise, please sign in.
            </Typography>
            <SignInForm history={history} />
            <br />
            <br />
        </div>
        )
}

export default withRouter(SignInPage);

export {
    SignInForm
};
