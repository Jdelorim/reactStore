import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import LoginHolder from '../loginHolder/loginHolder';
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
    constructor(props) {
        super(props)
        this.state = {
            redirectTo: '',
            products: [],
            timeStamp: '',
            totalPrice: '',
            itemNo: []
        }
    }
    componentDidMount=()=>{
        if(this.unmounted) return;
        this.checkLoggedIn('/login');
        this.getUserInfo();
       
    }
    componentWillUnmount=()=> {
        this.setState({
            redirectTo: ''
        })
        this.unmounted = true;
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
    getUserInfo = () =>{
        axios.get('/store/cart').then(res => {
            console.log(JSON.stringify(res.data.data.products, null, 3));
            if(this.unmounted) return;
            this.setState({ 
            products: res.data.data.products
            });
        })
       .catch(err=>{
            console.log(err);
        })
        
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
            return <PricePerUnit ppu={p.pricePerUnit} key={i} />
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
                        <h2>Shopping Cart</h2>
                    </div>   
                <div className='cart-table'>
                    <div className='cart-col'>
                        <h4>Item No</h4>
                       
                    </div>
                    <div className='cart-col'>
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
                    <div className='cart-col'>
                        <h4>Remove from Cart</h4>
                        <button className='item'>
                           X
                        </button>
                    </div>

                    </div>
                    <div className='cart-table-bottom'>
                        
                        <div className='price-holder'>
                            <h4>Total Price</h4>
                        </div>

                        
                    </div>
                </div>
             
            </div>
        )
        }
    }
}