import React, { Component } from 'react';
import './records.css';

export default class Records extends Component {
    render() {
        return(
            <div>
                <h1>{this.props.artistName}</h1>
                <h1>{this.props.albumName}</h1>
            </div>
        )
    }
}
