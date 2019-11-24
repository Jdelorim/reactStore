import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../cart/cart.css'
export default class RemoveItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            redirectTo: ''
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
            this.setState({
                redirectTo: '/cart'
            })
        })
       
        .catch(err=>{
            console.log(err);
        })
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo}} />
        } else {
        return(
            <div className='item-remove'>
            <form onSubmit={this.onSubmit}>
                <input type='hidden' value={this.props.id} />
                <button type='submit' onClick={this.refreshPage}>
                    X
                </button>

            </form>
            </div>
        )
        }
    }
}