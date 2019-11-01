import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import './App.css';
import About from './Components/about/about'; 
import Login from './Components/login/login';
import Register from './Components/register/register';
import Store from './Components/store/store';
import Profile from './Components/profile/profile';
import Cart from './Components/cart/cart';
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
            <NavLink to="/login" className='nav-link'>Login</NavLink>
            </li>
          </ul>
         </div>
    </div>
    
    <Route path='/' exact component={ About } />
    <Route path='/registration' exact component= { Register } />
    <Route path='/login' exact component= { Login } />
    <Route path='/store' exact component= { Store } />
    <Route path='/profile' exact component={ Profile } />
    <Route path='/cart' exact component={ Cart } />

    </Router>
    )
  }
}

export default App;
