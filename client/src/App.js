import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import About from './Components/about/about'; 
import Login from './Components/login/login';
import Register from './Components/register/register';
import Store from './Components/store/store';

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
            <li>
            <NavLink to="/registration" className='nav-link'>Register</NavLink>
            </li>
          </ul>
         
         
          
        </div>
    
      
   
        </div>
    
    <Route path='/' exact component={ About } />
    <Route path='/registration' exact component= { Register } />
    <Route path='/login' exact component= { Login } />
    <Route path='/store' exact component= { Store } />
   
    </Router>
    )
  }
}

export default App;
