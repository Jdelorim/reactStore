import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import './login.css';
import axios from 'axios';

export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            redirectTo: null
        }
     
    }
    onChangeEmail = (e) => {
        this.setState({
            email: e.target.value
        });
        console.log(`firstName: ${this.state.email}`);
    }
    onChangePassword = (e) => {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password
        }
        
        axios.post('users/login', data).then(res=>{
            if(res.status === 200) {
                console.log('logged in successful!');
                this.setState({
                    redirectTo: '/store'
                }) 
            }
        }).catch(err=>{
            console.log('login failer ' + err);
        })

     
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
            return(
                <div className='about-container'>
                    <div className='reg-title'>
                        <h2>Login</h2>
                     </div>
                     <form onSubmit={this.onSubmit}>
                         <div className='form-holder'>
                             <div className='form-group'>
                                 <label>Email:</label>
                                 <input type='email' className='form-control'
                                 value={this.state.email} onChange={this.onChangeEmail} required /> 
                             </div>
     
                             <div className='form-group'>
                                 <label>Password:</label>
                                 <input type='password' className='form-control'
                                 value={this.state.password} onChange={this.onChangePassword} required /> 
                             </div>
                             <div className='form-group'>
                                 <button type='submit'>Login Me In!</button>
                             </div>
                         </div>
                     </form>
                     <div className='reg-end'>
                         <p>Already have an account? Please <Link to="/registration">Register</Link> </p>
                    </div>
                </div>
             )

        }

    }
 } 


 