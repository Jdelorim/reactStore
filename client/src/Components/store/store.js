import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './store.css';
import axios from 'axios';

export default class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
          
           redirectTo: null
        }
        // this.checkLogin = this.checkLogin.bind(this);
    }
    componentDidMount(){
        axios.get('/users/check').then(res => {
            console.log(JSON.stringify(res, null, 3));
            if(res.data.user){
                console.log('user detected');
            } else {
                console.log('hitting null');
                this.setState({
                    redirectTo: '/login'
                })
            }
        }).catch(err=>{
            console.log('err '+ err);
        })
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return(
                <div className='about-container'>
                    <div className='reg-title'>
                        <h2>STORE</h2>
                        <img src='./images/queen.png' alt='queen' />
                    </div>
                </div>
            )
        }
    }
}