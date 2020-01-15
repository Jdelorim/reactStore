import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginHolder from '../loginHolder/loginHolder';
import RemoveItem from '../removeItem/removeItem';
import './cart.css';

const Albuminfo = props =>(
    <div className='item-album'>
        { props.album } 
    </div>
)
const Artisinfo = (props) => (
    <div className='item-artist'>
        { props.artist }
    </div>
)
const Itemquantity = (props) => (
    <div className='item'>
        { props.quantity }
    </div>
)
const PricePerUnit = props => (
    <div className='item'>
        { props.ppu }
    </div>
)

export default class Cart extends Component {
    unmounted = false;
    constructor(props) {
        
        super(props)
        this.state = {
            redirectTo: null,
            products: [],
            timeStamp: '',
            totalPrice: '',
            itemNo: [],
            currentId: '',
            shippingAddress: '',
            cartId: ''
        }

        

    }
   
    componentDidMount=()=>{
       this.unmounted = false;
        this.checkLoggedIn('/login');
        this.getUserInfo();

       
    }
    componentWillUnmount=()=> {
        this.setState({
            redirectTo: null
        })
        this.unmounted = true;
    }

    checkLoggedIn = (route) =>{
       
        axios.get('/users/check').then(res => {
            // console.log(JSON.stringify(res, null, 3));
            if(res.data.user){
                // console.log('user detected' + res.data.user.firstName);
                this.setState({
                    userName: res.data.user.firstName + ' ' + res.data.user.lastName,
                    userEmail: res.data.user.email,
                    shippingAddress: res.data.user.address + ', ' 
                                     + res.data.user.city + 
                                     ', ' + res.data.user.state 
                                     + ', ' + res.data.user.zipcode 
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

    getUserInfo = () =>{
        axios.get('/store/cart').then(res => {
            if(res.data.data) {
            if(res.data.data.products.length === 0) {
                this.setState({
                    trigEmpty: false
                })
            } else {
                this.setState({ 
                    trigEmpty: true,
                    products: res.data.data.products,
                    totalPrice: res.data.data.totalPrice,
                    cartId: res.data.data._id
                });
            }
        }  
        }).catch(err=>{
            console.log(err);
        })
        
    }

    grabDate = () => {
        let d = new Date();
        let nd =  (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear() ;
       return nd;

    }
    placeOrder = () => {
        const cartData = {
            userName: this.state.userName,
            userEmail: this.state.userEmail,
            totalPrice: this.state.totalPrice,
            products: this.state.products,
            cartId: this.state.cartId
        }
        if(this.unmounted === false) {
        axios.post('/store/placeOrder', cartData).then(res=>{
            if(res) {
                this.setState({
                    redirectTo: '/order'
                });
            }
         })
        .catch(err=>{
            return err;
        })
    }
    }
    
    displayAlbums = () => {
       return this.state.products.map((p,i)=>{
            return <Albuminfo album={p.albumName}  key={i} />;
        })
    }
    displayArtist = () => {
        return this.state.products.map((a,i)=>{
            return <Artisinfo artist={a.artistName} key={i} />
        })
    }
    displayQuantity = () => {
        return this.state.products.map((q,i)=>{
            return <Itemquantity quantity={q.quantity} key={i} />
        })
    }
    displayPrice = () => {
        return this.state.products.map((p,i)=>{
            return <PricePerUnit ppu={'$' + p.pricePerUnit} key={i} />
        })
    }
    removeItem = () => {
        return this.state.products.map((id, i)=>{
            return <RemoveItem id={id.id} key={i} />
        })
    }
    
    
    
    render() {
        if(this.state.redirectTo) {
            return <Redirect to={{ pathname: this.state.redirectTo }} push={true}  />
        } else {
        return (
            <div className='login-holder'>
                <LoginHolder userName={this.state.userName} />
                 <div className='cart-container'>
                    <div className='cart'>
                        <h2>Shopping Cart</h2>
                    </div>   
                <div className={this.state.trigEmpty ? 'hide-me-cart' : 'show-me-cart'}>
                    <div className='empty-cart'>
                        <b>Cart is Empty! Please place an order!</b>
                    </div>
                </div>
                <div className={this.state.trigEmpty ? 'show-me-cart' : 'hide-me-cart'}> 
               
                <div className='cart-table'>
                
                    <div className='cart-col-first'>
                        <h4>Artist</h4>
                       { this.displayArtist() }
                    </div>
                    <div className='cart-col'>
                        <h4>Album</h4>
                        { this.displayAlbums() }
                    </div>
                    <div className='cart-col'>
                        <h4>Quantity</h4>
                        { this.displayQuantity() }
                    </div>
                    <div className='cart-col'>
                        <h4>PricePerUnit</h4>
                        { this.displayPrice() }
                    </div>
                    <div className='cart-col-last'>
                        <h4>Remove</h4>
                       { this.removeItem() }
                    </div>

                    </div>
                    <div className='cart-table-bottom'>
                        <div className='price-holder'>
                            <div><b>Date: </b> { this.grabDate() } </div>
                            <div><b>Total Price:</b> ${this.state.totalPrice}</div>
                            <div><b>Shipping Address: </b>{this.state.shippingAddress}</div>
                            <button  className='profile-Btn'  onClick={this.placeOrder}>Place Order</button>
                        </div>
                    </div>
                </div>
             </div>
            </div>
        )
        }
    }
}