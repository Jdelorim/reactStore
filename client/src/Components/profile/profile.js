import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginHolder from '../loginHolder/loginHolder';
import './profile.css';
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectTo: ''
        }
    }
    componentDidMount(){
        this.checkLoggedIn('/login')
    }

    checkLoggedIn = (route) =>{
        console.log('-----'+route);
        axios.get('/users/check').then(res => {
            console.log(JSON.stringify(res, null, 3));
            if(res.data.user){
                console.log('user detected' + res.data.user.firstName);
                this.setState({
                    userName: res.data.user.firstName + ' ' + res.data.user.lastName
                })
            } else {
                console.log('hitting null');
                this.setState({
                    redirectTo: route
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
                <div className='loginHolder'>
                    <LoginHolder userName={this.state.userName} />
                
                <div className='profile-container'>
                    <div className='profile'>
                        <h2>{this.state.userName} Profile</h2>
                    </div>
                    </div>
                </div>
            )

        }
    
    }
}