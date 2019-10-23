import React from 'react';
import './App.css';
import World from './features/world';
import NavBar from './features/NavBar.js';
import Room from "./features/player"

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <World />
        <Room />
      </div>
    );
  }
}

export default App;
