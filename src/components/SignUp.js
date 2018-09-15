import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import {auth} from '../firebase/firebase';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

const INITIAL_STATE = {
            email: '',
            password1: '',
            password2: '',
            error: null
    }

// abstracts the setting of state values by passing in keywords
const byPropKey = (propertyName, value) => ({
    [propertyName]: value
})

class SignUpForm extends Component {
    constructor(props) {
        super(props);
        this.style = {
          fullwidth: {
            width: '100%'
          }
        }
        this.state = {...INITIAL_STATE}; // the spread operator!
    }

    onSubmit = (event) => {
        const {
            history,
        } = this.props;

        auth.createUserWithEmailAndPassword(this.state.email, this.state.password1)
            .then(authUser => {
                this.setState(() => ({...INITIAL_STATE})); // reset the state of the component
                authUser.sendEmailVerification()
                  .then(() => {
                    history.push(routes.HOME);
                  })
                  .catch((e) => {
                    this.setState({
                      error: e,
                    });
                  });
                /* redirect to the home page by adding that location to the top of the history;
                history object comes from the larger overall Router object */
            }).catch(error => {
                // console.log(byPropKey('error', error));
                this.setState(byPropKey('error', error)); // if there's an error, update the state
        });

        event.preventDefault(); // prevents the reload

    }

    render() {
        const {
            // username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state; // deconstructing the state object to assign variables quickly

        const isInvalid = (
            passwordOne !== passwordTwo ||
            passwordOne === "" ||
            email === ""
            // username === ""
            )

        return (
            <div>
                <TextField
                value={email}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('email', e.target.value) ) }
                type='text'
                label='Email'/>
                <br/>
                <TextField
                value={passwordOne}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('password1', e.target.value) ) }
                type='password'
                label='Password'/>
                <br/>
                <TextField
                value={passwordTwo}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('password2', e.target.value) ) }
                type='password'
                label='Confirm Password'/>
                <br/>
                <Button color='primary' variant='raised'
                disabled={isInvalid}
                style={this.style.fullwidth}
                onClick={this.onSubmit}> Sign Up </Button>
                { error && <FormHelperText style={{'color':'#ff5722'}}>Error: { error.message }</FormHelperText> }
            </div>
            )
    }
}

// stateless 'element', which is like a dumber component
const SignUpLink = () => {
    return (
    <p>Don't have an account?
        <Link to={routes.SIGN_UP}> Sign Up</Link>
    </p>
    )
}

// stateless 'element', which is like a dumber component
const SignUpPage = ({history}) => {
    return (
    <div>
        <Typography
              variant="display3"
              gutterBottom>
              Sign Up</Typography>
        <SignUpForm history={history}/>
        <br />
        <br />
    </div>
    )
}

export default withRouter(SignUpPage);

export {SignUpForm, SignUpLink};

/* any component using withRouter gets access to all the properties of Router */