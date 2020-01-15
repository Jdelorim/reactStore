import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import '../cart/cart.css'
export default class RemoveItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            
        }
    }

    refreshPage = () => {
        window.location.reload(false);
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.setState({
            id: e.target.value
        }, console.log('-----' + this.state.id))
        const data = {
            id: this.state.id
        }

        axios.post('store/removecart', data ).then(res=>{
            console.log('resss ' + JSON.stringify(res));
            if(res) {
                this.refreshPage();
            }
           
        })
        .catch(err=>{
            console.log(err);
        })
    }

  

    render() {
      
        return(
            <div className='item-remove'>
            <form onSubmit={this.onSubmit}>
                <input type='hidden' value={ this.props.id } />
                <button type='submit'>
                    X
                </button>

            </form>
            </div>
        )
        }
    }
