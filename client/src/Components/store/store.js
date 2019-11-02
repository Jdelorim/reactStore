import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './store.css';
import axios from 'axios';
import Records from '../records/records';
import LoginHolder from '../loginHolder/loginHolder';

import './store.css';
export default class Store extends Component {
    constructor(props) {
        super(props);

        this.state = {
           artistName: [],
           albumName: [], 
           catPrice: [],
           imgRef: [],
           redirectTo: '',
           userName: '',
           data: []
           
          
        }
    }
    componentDidMount(){
        this.checkLoggedIn('/login');
        this.getAlbums();
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

    getAlbums = () => {
        axios.get('/store/products').then(res => {
            console.log(JSON.stringify(res,null, 3));
            console.log(res.data);
                this.setState({
                    artistName: res.data.artistName,
                      data: [...res.data]
                });
                console.log('-----------' + JSON.stringify(this.state.data, null, 3));
                
               
               
            
           
        
            
            

        })
    }

    render() {
        if(this.state.redirectTo) {
           
            return <Redirect to={{ pathname: this.state.redirectTo }} />
            
         } else {
           
            return(
                <div>
               
                    
               <div className='loginHolder'>
                   <LoginHolder userName={this.state.userName} />
               
               
                <div className='store-container'>
                    <div className='store-title'>
                        <h2>STORE</h2>
                        <div className='record-wrapper'>
                       
                      {(this.state.data).map(i=>
                    <Records artistName = {i.artistName} albumName = {i.albumName} 
                             id = {i.id} quantity = {i.quantity} price = {i.price}
                             imgRef = {i.imgRef}

                    />
                     )}
                
              
                        
                        </div>
                    </div>
                </div>
                
                </div>
                </div>
                
               
            )
        }
       
    }
}