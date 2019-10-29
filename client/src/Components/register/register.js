import React, { Component } from 'react';
import axios from 'axios';
import './register.css';


const Usernametaken = () => (
    <div className='hidden'>
        <h1>Username Taken!</h1>
    </div>
)
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
    componentDidMount(){
        axios.get('/login').then(res=>{
            if(this.unmounted) return;
            this.setState({
                info: res.data
            });
            const data = {
                email: [],
                firstName: [],
                lastName: []
                
            }
            for(let i=0;i<this.state.info.length;i++) {
                data.email.push(this.state.info[i].email);
            }

            this.setState({
                newEmail: data.email,
                newfirstName: data.firstName,
                newlastName: data.lastName
            });
            console.log(`email ${this.state.newEmail}`);
            console.log(`firstName: ${this.state.newfirstName}`);
            console.log(`lastName: ${this.state.lastName}`);
        }).catch(err=>{
            console.log(err);
        })
    }

    onChangefirstName(e){
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
        
        for(var i=0;i<this.state.newEmail.length;i++){
            if(this.state.newEmail[i] === this.state.email){
                console.log('it matches');
                return;
            }  
        }

     axios.post('/users/register/', info).then(res=>{
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
              <div className='about'>
                 <h2>Register</h2>
                 <form onSubmit={this.onSubmit}>
                     <div className='form-group'>
                         <label>First Name:</label>
                         <input type='text' className='form-control' 
                         value={this.state.firstName}
                         onChange={this.onChangefirstName} />
                     </div>

                     <div className='form-group'>
                         <label>Last Name:</label>
                         <input type='text' className='form-control' 
                         value={this.state.lastName}
                         onChange={this.onChangelastName} />
                     </div>

                     <div className='form-group'>
                         <label>Email:</label>
                         <input type='text' className='form-control' 
                         value={this.state.email}
                         onChange={this.onChangeEmail} />
                     </div>

                     <div className='form-group'>
                         <label>Password:</label>
                         <input type='text' className='form-control' 
                         value={this.state.password}
                         onChange={this.onChangePassword} />
                     </div>

                     <div className='form-group'>
                         <label>Confirm Password:</label>
                         <input type='text' className='form-control' 
                         value={this.state.confirmPassword}
                         onChange={this.onChangeConfirmPassword} />
                     </div>

                     <div className='form-group'>
                         <button type='submit'>
                             Sign Me Up!
                         </button>
                     </div>
                 </form>
              </div>
          </div>

        )


    }
}