import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginHolder from '../loginHolder/loginHolder';
import './profile.css';
export default class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirectTo: '',
            firstName: '',
            lastName: '',
            email: ''
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
                    userName: res.data.user.firstName + ' ' + res.data.user.lastName,
                    firstName: res.data.user.firstName,
                    lastName: res.data.user.lastName,
                    email: res.data.user.email
                });
                
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
  

    updateUser = () => {
        let data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email
        }
        axios.post('/users/update', data ).then(res =>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    deleteUser = () => {

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
                        <form onSubmit={this.updateUser}>
                            <div className='form-holder'>
                            <div className='form-group'>
                                <label>First Name:</label>
                                <input type='text' className='form-control' value={this.state.firstName} />
                            </div>

                            <div className='form-group'>
                                <label>Last Name:</label>
                                <input type='text' className='form-control' value={this.state.lastName} />
                            </div>

                            <div className='form-group'>
                                <label>Email:</label>
                                <input type='text' className='form-control' value={this.state.email} />
                            </div>
                            <div className='form-group'>
                                <button type='submit'>UPDATE</button>
                                <button type='submit' onclick={this.deleteUser}>DELETE</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
            )

        }
    
    }
}