import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './Components/home/home'; 

class App extends Component {
  render(){
    return(
    <Router>
      <div className='main-home'>
        <div className='nav-bar'>
          <h1>SPINSTER RECORDS</h1>
          <ul className='nav-list'>
            <li>
              <NavLink to="/" className='nav-link'>About</NavLink>
            </li>
            <li>
            <NavLink to="/store" className='nav-link'>Store</NavLink>
            </li>
            <li>
            <NavLink to="/profile" className='nav-link'>Profile</NavLink>
            </li>
          </ul>
         
         
          
        </div>
    
      
   
        </div>
    <Route path='/' exact component={ Home } />
   
    </Router>
    )
  }
}

export default App;
