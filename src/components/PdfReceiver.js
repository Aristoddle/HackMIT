import React, {Component} from 'react';
import { Document, Page } from 'react-pdf';
import writeFile from 'fs';

import {byPropKey} from '../constants/lib';

class PdfReceiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: '',
        }
    }

    componentDidMount() {  
        if(this.props.uid !== null) {
            fetch('http://localhost:4000/' + this.props.uid)
            .then( (results) => {
                console.log(results);
                this.setState(byPropKey('response', results));
            }).catch( (error) => {
                this.setState(byPropKey('response', error));
            })
        }
    }

    render() {
        return (
            <div>
                {"the end: " + JSON.stringify(this.state.response)}
            </div>
        )
    }
}

export default PdfReceiver;