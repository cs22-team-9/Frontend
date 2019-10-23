import React from 'react';
import Player from '../player';
import Map from '../map';

// import { tiles } from '../../data/maps/1';
// import store from '../../config/store';
import axios from 'axios';

var _ = require('lodash');

class World extends React.Component {
  state = {
    data: null,
    data_title: [],
    matrix: null,
  };
  // store.dispatch({
  //   type: 'ADD_TILES',
  //   payload: {
  //     tiles: tiles,
  //   },
  // });

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    axios
      .get('https://adv-game-test.herokuapp.com/api/adv/call_map')
      .then(res => {
        this.setState({ data: res.data.call_map });
      });
  };

  parseDataTitle = () => {
    this.state.data &&
      this.state.data.map(element => {
        this.state.data_title.push(element.tile);
      });
    this.state.data_title &&
      (this.state.matrix = _.chunk(this.state.data_title, 10));
    console.log('Matrix', this.state.matrix);
  };

  render() {
    this.parseDataTitle();
    return (
      <div
        style={{
          position: 'relative',
          width: '400px',
          height: '600px',
          margin: '20px auto',
        }}>
        <Map tiles={this.state.matrix} />
        <Player />
      </div>
    );
  }
}

export default World;
