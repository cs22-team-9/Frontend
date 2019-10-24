import React from 'react';
import './App.css';
import World from './features/world';
import NavBar from './features/NavBar.js';
import Register from './features/Register';
import Login from './features/Login';

import { BrowserRouter, Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/' component={World} />
      </div>
    );
  }
}

export default App;
