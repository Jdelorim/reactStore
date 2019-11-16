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
            email: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipcode: ''
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
                    email: res.data.user.email,
                    phone: res.data.user.phone,
                    address: res.data.user.address,
                    city: res.data.user.city,
                    state: res.data.user.state,
                    zipcode: res.data.user.zipcode
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
    onChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateUser = (e) => {
        e.preventDefault();

        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            phone: this.state.phone,
            zipcode: this.state.zipcode,
        }
       
       
        axios.post('/users/update', data ).then(res =>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
        })
    }

    deleteUser = (e) => {
        e.preventDefault();
       const {data} = this.state;
        axios.post('/users/delete', data ).then(res =>{
            console.log(res);
        })
        .catch(err=>{
            console.log(err);
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
                        <form onSubmit={this.updateUser}>
                            <div className='form-holder'>
                            <div className='form-group'>
                                <label>First Name:</label>
                                <input type='text' className='form-control' value={this.state.firstName} 
                                onChange={this.onChange} name='firstName' required/>
                            </div>

                            <div className='form-group'>
                                <label>Last Name:</label>
                                <input type='text' className='form-control' value={this.state.lastName} 
                                onChange={this.onChange} name='lastName' required/>
                            </div>

                            <div className='form-group'>
                                <label>Email:</label>
                                <input type='text' className='form-control' value={this.state.email} 
                                onChange={this.onChange} name='email' required />
                            </div>

                            <div className='form-group'>
                                <label>Address:</label>
                                <input type='text' className='form-control' value={this.state.address} 
                                onChange={this.onChange} name='address' required />
                            </div>

                            <div className='form-group'>
                                <label>City:</label>
                                <input type='text' className='form-control' value={this.state.city} 
                                onChange={this.onChange} name='city' required />
                            </div>

                            <div className='form-group'>
                                <label>State:</label>
                                <input type='text' className='form-control' value={this.state.state} 
                                onChange={this.onChange} name='state' required />
                            </div>

                            <div className='form-group'>
                                <label>Zipcode:</label>
                                <input type='text' className='form-control' value={this.state.zipcode} 
                                onChange={this.onChange} name='zipcode' required />
                            </div>

                            <div className='form-group'>
                                <label>Phone Number:</label>
                                <input type='text' className='form-control' value={this.state.phone} 
                                onChange={this.onChange} name='phone' required />
                            </div>

                            <div className='form-group'>
                                <button type='submit' onClick={this.updateUser}>UPDATE</button>
                                <button type='submit' onClick={this.deleteUser}>DELETE</button>
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