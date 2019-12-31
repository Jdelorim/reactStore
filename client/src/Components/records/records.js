import React, { Component } from 'react';
import './records.css';
import axios from 'axios';

export default class Records extends Component {
    constructor(props){
        super(props)
        
       this.state ={
           count: 1, 
           quantity: this.props.quantity,
           trig: false,
           id: this.props.id,
           inCart: false,
           added: false
        }
    }

    countUp = () =>{
      let countUp = this.state.count + 1;
      this.setState({
        count: countUp
       
      },this.countCatcher, console.log(this.state.count, this.state.quantity))
    }
    
    countDown = () =>{
        let countDown = this.state.count - 1;
        this.setState({
          count: countDown
          
        },this.countCatcher)
      }

      countCatcher = () => {
          let newCount = this.state.count;
          if(newCount >= this.state.quantity) {
            this.setState({
                count: this.state.quantity,
                trig: true,
                inCart: false,
                added: false
            },console.log(this.state.trig))
        } else if(newCount <= 1) {
            this.setState({
                count: 1
            })
        } else {
            this.setState({
                trig: false
            })
        }
    }

    addToCart = () => {
        console.log(this.state.id);
        const data = {
           id: this.state.id,
           quantity: this.state.count
           
        }

        axios.post('/store/addToCart', data).then(res=>{
            if(res.status === 200) {
               console.log('response', res.data.msg);
               if(res.data.msg) {
                   this.setState({
                       inCart: true
                   }, console.log('in cart: ' + this.state.inCart));
               } else if(res.data.added) {
                   this.setState({
                       added: true
                   }, console.log('added' +  this.state.added));
               } else {
                   this.setState({
                        added: false,
                        inCart: false
                   })
               }
            }
        }).catch(err=>{
            console.log(err);
        })
    }

    render() {
        return(
            <div className='record-wrapper'>
                 <div className='record-holder'>
                <div className='record-album'>
                    <div><b>Artist:</b> {this.props.artistName}</div>
                    <div><b>Album:</b> {this.props.albumName}</div>
                </div>
                <div className='record-price'>
                <div><b>Price:</b> ${this.props.price}</div>
                </div>
                    <img name={this.props.artistName} src={this.props.imgRef}
                        alt={this.props.artistName} />
                    <div className='record-cart'>
                        <button  className='cart-btn' onClick={this.addToCart}>Add to Cart</button>
                        <button className='number-btn' onClick={this.countDown}>-</button>
                        <button className='number-btn' onClick={this.countUp}>+</button>
                        <input type='number' className='cart-quant' value={this.state.count} readOnly />
                    </div>
                    <div className={this.state.trig ? 'show-me'  : 'hide-me'}>Only <b style={{color: 'white'}}>{this.state.quantity}</b> in stock!</div>
                    <div className={this.state.inCart ? 'show-me'  : 'hide-me'}>Item already in Shopping Cart. You can edit your order in Shopping Cart.</div>
                    <div className={this.state.added ? 'show-me'  : 'hide-me'}>Item successfully added!</div>
                </div>
            </div>
           
        )
    }
}
