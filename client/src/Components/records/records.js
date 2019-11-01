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
           id: this.props.id

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
                trig: true
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
        const id = this.state.id;
        axios.post('/store/addToCart', id).then(res=>{
            if(res.status === 200) {
               console.log('Added to Cart!');
               //finish backend routes 
            }
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
                <div><b>Price:</b> {this.props.catPrice}</div>
                </div>
                    <img name={this.props.artistName} src={this.props.imgRef}
                        alt={this.props.artistName} />
                    <div className='record-cart'>
                        
                        
                        <button  className='cart-btn' onClick={this.addToCart}>Add to Cart</button>
                    
                        <button className='number-btn' onClick={this.countDown}>-</button>
                        <button className='number-btn' onClick={this.countUp}>+</button>
                        <input type='number' className='cart-quant' value={this.state.count} readOnly />
                    </div>
                    <div className={this.state.trig ? 'show-me'  : 'hide-me'}>Only {this.state.quantity} in stock!</div>
                </div>
            </div>
           
        )
    }
}
