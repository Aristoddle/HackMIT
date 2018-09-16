import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import {auth, db} from '../firebase/firebase';
import {validateEmail, validatePhone} from '../constants/lib';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

const INITIAL_STATE = {
    name: '',   
    email: '',
    password1: '',
    password2: '',
    address: '', // zillow?
    city: '',
    state: '',
    zipcode: '',
    phone: '', 
    insuranceCompany: '',
    disaster: '', // will autopopulate a lot of information that everyone shares
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

        var filled = this.state;

        // error checking
        if (
            filled.name === ""// name empty
            || !validateEmail(filled.email) // email regex
            || filled.password1 === "" // password null
            || filled.password1 !== filled.password2 // passwords don't match
            || !validatePhone(filled.phone) // phone regex
            || filled.insuranceCompany === "" // insurance company
        ) {
            this.setState(byPropKey('error', 'invalid form data'));
        } else {
            console.log("creating account");
            // create the user in the auth
            auth.createUserWithEmailAndPassword(this.state.email, this.state.password1)
                .then(authUser => {
                    this.setState(() => ({...INITIAL_STATE})); // reset the state of the component
                    history.push(routes.HOME);
                }).catch(error => {
                    console.log(error);
                    this.setState(byPropKey('error', error)); // if there's an error, update the state
            });

            // create the user in the db
            db.collection("users").add({
                name: filled.name,   
                email: filled.email,
                address: filled.address, // zillow?
                city: filled.city,
                state: filled.state,
                zipcode: filled.zipcode,
                phone: filled.phone, 
                insuranceCompany: filled.insuranceCompany,
                disaster: filled.disaster,
            }).then( (docRef) => {
                console.log(docRef.id);
            }).catch( (error) => {
                console.log("failed to write");
                this.setState(byPropKey('error', error)); // if there's an error, update the state
            })
            event.preventDefault(); // prevents the reload
        }
    }

    render() {
        const {
            name,   
            email,
            password1,
            password2,
            address, // zillow?
            city,
            state,
            zipcode,
            phone, 
            insuranceCompany,
            disaster,
            error
        } = this.state; // deconstructing the state object to assign variables quickly

        return (
            <div>
                <TextField
                value={name}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('name', e.target.value) ) }
                type='text'
                label='Name'/>
                <br/>
                <TextField
                value={email}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('email', e.target.value) ) }
                type='text'
                label='Email'/>
                <br/>
                <TextField
                value={phone}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('phone', e.target.value) ) }
                type='text'
                label='Phone'/>
                <br/>
                <TextField
                value={password1}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('password1', e.target.value) ) }
                type='password'
                label='Password'/>
                <br/>
                <TextField
                value={password2}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('password2', e.target.value) ) }
                type='password'
                label='Confirm Password'/>
                <br/>
                <TextField
                value={address}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('address', e.target.value) ) }
                type='text'
                label='Address'/>
                <br/>
                <TextField
                value={city}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('city', e.target.value) ) }
                type='text'
                label='City'/>
                <br/>
                <TextField
                value={state}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('state', e.target.value) ) }
                type='text'
                label='State'/>
                <br/>
                <TextField
                value={zipcode}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('zipcode', e.target.value) ) }
                type='text'
                label='zip code'/>
                <br/>
                <TextField
                value={insuranceCompany}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('insuranceCompany', e.target.value) ) }
                type='text'
                label='Insurance Company'/>
                <br/>
                <TextField
                value={disaster}
                style={this.style.fullwidth}
                onChange={ (e) => this.setState( byPropKey('disaster', e.target.value) ) }
                type='text'
                label='Disaster'/>
                <br/>
                <Button color='primary' variant='raised'
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