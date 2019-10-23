import React from 'react';
import './App.css';
import World from './features/world';
import NavBar from './features/NavBar.js';
import Register from "./features/Register";
import Login from "./features/Login"
// import Room from './features/player';

import { BrowserRouter, Router, Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <World />
        {/* <Room /> */}
      </div>
    );
  }
}

export default App;
