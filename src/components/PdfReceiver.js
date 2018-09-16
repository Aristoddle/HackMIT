import React, {Component} from 'react';
import { Document, Page } from 'react-pdf';

import {byPropKey} from '../constants/lib';

class PdfReceiver extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buffer: [],
            error: ''
        }
    }

    componentDidMount() {  
        fetch('https://us-central1-hackmit-7c665.cloudfunctions.net/generatePdf?uid=' + this.props.uid)
        .then( (results) => {
            console.log(results);
            this.setState(byPropKey('buffer', results));
        }).catch( (error) => {
            this.setState(byPropKey('error', error));
        })
    }

    render() {
        return (
            <div>
                <Document file={this.state.buffer} />
            </div>
        )
    }
}

export default PdfReceiver;