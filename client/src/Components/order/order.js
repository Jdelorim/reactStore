import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginHolder from '../loginHolder/loginHolder';
import Cart from '../cart/cart';

export default class Order extends Component {
    unmounted = false;
    constructor(props) {
        super(props);
        this.state = {
            redirectTo: null,
            userName: '',
            userEmail: ''
        }
    }
    componentDidMount = () =>{
        if(this.unmounted) return;
        this.checkLoggedIn('/login');
        this.getLastOrder();
    }
    componentWillUnmount = () =>{
        this.setState({
            redirectTo: null
        })
        this.unmounted = true;
    }
    checkLoggedIn = (route) => {
       axios.get('/users/check').then(res => {
            if(res.data.user){
               this.setState({
                    userName: res.data.user.firstName + ' ' + res.data.user.lastName,
                    userEmail: res.data.user.email,
                  })
            } else {
                this.setState({
                    redirectTo: route
                })
            }
        }).catch(err=>{
            console.log('err '+ err);
        })
    }

    getLastOrder = () => {
        axios.get('/store/orderReview').then(res=>{
            if(!this.state.unmounted) {
                if(res.data) {
                    this.setState({
                        products: res.data.products,
                    },console.log(this.state.products))
                }
            }
        })
    }

    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} />
        } else {
        return (
           <div className='login-holder'>
               <LoginHolder userName={this.state.userName} />
               
               <div className='cart-container'>
                    <div className='cart'>
                        <h2>Order Review</h2>
                    </div>
                    
                <div className='cart-table'>
                    <div className='cart-col-first'>
                            <h4>Artist</h4>
                        </div>
                        <div className='cart-col'>
                            <h4>Album</h4>
                        </div>
                        <div className='cart-col'>
                            <h4>Quantity</h4>
                        </div>
                        <div className='cart-col-last'>
                            <h4>PricePerUnit</h4>
                        </div>
                        
                    </div>
                </div>
           </div>

        

        )
    }
    }
}
