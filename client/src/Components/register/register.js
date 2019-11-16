import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './register.css';


export default class Register extends Component {
    constructor(props) {
        super(props);
      
    
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
        password: '',
        confirmPassword: '',
        newEmail: [],
    }

}
    onChange = e =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onChangefirstName=(e)=>{
        this.setState({
            firstName: e.target.value

        });
        console.log(`firstName: ${this.state.firstName}`);
    }
    onChangelastName=(e)=>{
        this.setState({
            lastName: e.target.value
        });
        console.log(`lastName: ${this.state.lastName}`);
    }
    onChangeEmail=(e)=>{
        this.setState({
            email: e.target.value
        });
        console.log(`email: ${this.state.email}`);
    }
    onChangePassword=(e)=>{
        this.setState({
            password: e.target.value
        })
    }
    onChangeConfirmPassword=(e)=>{
        this.setState({
            confirmPassword: e.target.value
        })
    }
    
    onSubmit=(e)=> {
        e.preventDefault();
       

        const info = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            phone: this.state.phone,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipcode: this.state.zipcode,
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
        phone: '',
        address: '',
        city: '',
        state: '',
        zipcode: '',
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
                         <label>Phone Number:</label>
                         <input type='tel' className='form-control' 
                         pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                         name='phone'
                         value={this.state.phone}
                         onChange={this.onChange} required />
                     </div>

                     <div className='form-group'>
                         <label>Address:</label>
                         <input type='text' className='form-control' 
                         name='address'
                         value={this.state.address}
                         onChange={this.onChange} required />
                     </div>


                     <div className='form-group'>
                         <label>City:</label>
                         <input type='text' className='form-control' 
                         name='city'
                         value={this.state.city}
                         onChange={this.onChange} required />
                     </div>

                     <div className='form-group'>
                         <label>State:</label>
                         <input type='text' className='form-control' 
                         name='state'
                         value={this.state.state}
                         onChange={this.onChange} required />
                     </div>

                     <div className='form-group'>
                         <label>ZIP Code:</label>
                         <input type='text' className='form-control' 
                         name='zipcode'
                         value={this.state.zipcode}
                         onChange={this.onChange} required />
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