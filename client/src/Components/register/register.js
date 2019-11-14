import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';


export default class Register extends Component {
    constructor(props) {
        super(props);
        this.onChangefirstName = this.onChangefirstName.bind(this);
        this.onChangelastName = this.onChangelastName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        newEmail: [],
    }

}


    onChangefirstName=(e)=>{
        this.setState({
            firstName: e.target.value

        });
        console.log(`firstName: ${this.state.firstName}`);
    }
    onChangelastName(e){
        this.setState({
            lastName: e.target.value
        });
        console.log(`lastName: ${this.state.lastName}`);
    }
    onChangeEmail(e){
        this.setState({
            email: e.target.value
        });
        console.log(`email: ${this.state.email}`);
    }
    onChangePassword(e){
        this.setState({
            password: e.target.value
        })
    }
    onChangeConfirmPassword(e){
        this.setState({
            confirmPassword: e.target.value
        })
    }
    
    onSubmit(e) {
        e.preventDefault();
       

        const info = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword
        }
        if(this.state.confirmPassword !== this.state.password) {
            alert("passwords do not match");
            return;
        }
        
       

     axios.post('users/register/', info).then(res=>{
         console.log(res.data);
     })
           
    this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        });

    }

    
    render(){
        return(
          <div className='about-container'>
                <div className='reg-title'>
                <h2>Register To Shop</h2>
                </div>
                 
                 <form onSubmit={this.onSubmit}>
                     <div className='form-holder'>
                     <div className='form-group'>
                         <label>First Name:</label>
                         <input type='text' className='form-control' 
                         value={this.state.firstName}
                         onChange={this.onChangefirstName}  required/>
                     </div>

                     <div className='form-group'>
                         <label>Last Name:</label>
                         <input type='text' className='form-control' 
                         value={this.state.lastName}
                         onChange={this.onChangelastName}  required/>
                     </div>

                     <div className='form-group'>
                         <label>Email:</label>
                         <input type='email' className='form-control' 
                         value={this.state.email}
                         onChange={this.onChangeEmail} required />
                     </div>

                     <div className='form-group'>
                         <label>Password:</label>
                         <input type='password' className='form-control' 
                         value={this.state.password}
                         onChange={this.onChangePassword}  required/>
                     </div>

                     <div className='form-group'>
                         <label>Confirm Password:</label>
                         <input type='password' className='form-control' 
                         value={this.state.confirmPassword}
                         onChange={this.onChangeConfirmPassword} required/>
                     </div>

                     <div className='form-group'>
                         <button type='submit'>
                             Sign Me Up!
                         </button>
                     </div>
                    
                     
                     </div>
                     <div className='reg-end'>
                         <p>Already have an account? Please <Link to="/login">Login</Link> </p>
                        
                     </div>
                  
                    
                 </form>
            
          </div>
          

        )


    }
}