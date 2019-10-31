import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './store.css';
import axios from 'axios';
import Records from '../records/records';
import LoginHolder from '../loginHolder/loginHolder';
export default class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
           artistName: 'david bowie',
           albumName: 'space oddity', 
           redirectTo: '',
           userName: ''
        }
       
     
    }


    componentDidMount(){
        this.checkLoggedIn('/login');
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

    redirectToLogin = () => {
        this.props.navigation.push('/login');
    }

    render() {
        if(this.state.redirectTo) {
           
            return <Redirect to={{ pathname: this.state.redirectTo }} />
            
         } else {
           
            return(
                
               <div className='loginHolder'>
                   <LoginHolder userName={this.state.userName} />
               
               
                <div className='about-container'>
                    <div className='reg-title'>
                        <h2>STORE</h2>
                        <Records artistName={this.state.artistName} albumName={this.state.albumName} />
                    </div>
                </div>
                </div>
            )
        }
       
    }
}