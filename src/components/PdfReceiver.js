import React, {Component} from 'react';
import { Document, Page } from 'react-pdf';
import writeFile from 'fs';

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
        if(this.props.uid !== null) {
            fetch('https://us-central1-hackmit-7c665.cloudfunctions.net/generatePdf?uid=' + this.props.uid)
            .then( (results) => {
                console.log(results);
                writeFile("/tmp/test.pdf", results);
                this.setState(byPropKey('buffer', results));
            }).catch( (error) => {
                this.setState(byPropKey('error', error));
            })
        }
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