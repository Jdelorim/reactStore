import React, { Component } from 'react';
import axios from 'axios';

export default class RemoveItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        }
    }
    onSubmit = e => {
        e.preventDefault();
        
        this.setState({
            id: e.target.value
        }, console.log('-----' + this.state.id))
        const data = {
            id: this.state.id
        }

        axios.post('store/removecart', data ).then(res=>{
            console.log(res)
        }).catch(err=>{
            console.log(err);
        })
    }

    render() {
        return(
            <form onSubmit={this.onSubmit}>
                <input type='hidden' value={this.props.id} />
                <button type='submit'>
                    X
                </button>

            </form>
        )

    }
}