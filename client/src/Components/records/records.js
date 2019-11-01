import React, { Component } from 'react';
import './records.css';

export default class Records extends Component {
    constructor(props){
        super(props)
        
       this.state ={
           count: 1, 
           quanity: this.props.quantity,
           trig: false,

       }
    
    }

    countUp = () =>{
      let countUp = this.state.count + 1;
      this.setState({
        count: countUp
      },this.countCatcher, console.log(this.state.trig))
    }
    
    countDown = () =>{
        let countDown = this.state.count - 1;
        this.setState({
          count: countDown
        },this.countCatcher)
      }

      countCatcher = () => {
          let newCount = this.state.count;
        if(newCount >= this.state.quanity) {
            this.setState({
                count: this.state.quanity,
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
                        <button className='cart-btn' >Add to Cart</button>
                        <button className='number-btn' onClick={this.countDown}>-</button>
                        <button className='number-btn' onClick={this.countUp}>+</button>
                        <input type='number' className='cart-quant' value={this.state.count} readOnly />
                        <div>{this.props.quantity}</div>
                    </div>
                    <div className={this.state.trig ? 'show-me'  : 'hide-me'}>Only {this.state.quanity} in stock!</div>
                </div>
            </div>
           
        )
    }
}
