import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './loginHolder.css';
import axios from 'axios';


export default class LoginHolder extends Component {
   constructor(props){
       super(props);
       this.state = {
           logOut: false,
           redirectTo: null
       }
   }
   handleClick = () => {
        this.setState({
            logOut: true,
        }, this.logOut);
   }

   logOut = () => {
    
       console.log(this.state.logOut);
    if(this.state.logOut === true) {
        axios.get('users/logout').then(res=>{
            if(res.status === 200) {
                console.log('logoout successful');
                this.setState({
                    redirectTo: '/login'
                })

            }
        }).catch(err=>{
            console.log('logout unsecessful ' + err);
        })

    }
   }
    render() {
        if(this.state.redirectTo) {
            return<Redirect to={{ pathname: this.state.redirectTo }} />
        }
        return(
            
            <div className='login-container'>
            <div className='login-control'>Welcome <b>{this.props.userName}</b>, you are logged in! </div>
            <ul>
                <li><Link to='/profile' className='user-links'>Profile</Link></li>
                <li><Link to='/cart'  className='user-links'>Shopping Cart</Link></li>
                <li><div className='user-links' onClick={this.handleClick}>Logout</div></li>
            </ul>
            
            </div>

        )
    }
}