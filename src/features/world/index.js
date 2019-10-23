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
    newOrder: [],
    newMatrix: null,
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
    axios.get('https://css22-9.herokuapp.com/api/adv/rooms').then(res => {
      this.setState({ data: res.data });
    });
  };

  parseDataTitle = () => {
    // console.log('DATA', this.state.data);
    this.state.data &&
      this.state.data.map(element => {
        this.state.data_title.push(element.title);
      });
    this.state.data_title &&
      (this.state.matrix = _.chunk(this.state.data_title, 10));

    this.state.data && (this.state.newMatrix = _.chunk(this.state.data, 10));
  };

  inOrder = () => {
    let oldOrder = this.state.data;

    for (let i = 0; i < 100; i++) {
      let y = oldOrder[i].x;
      let x = oldOrder[i].y;

      this.state.newMatrix[y][x] = oldOrder[i];
    }
  };

  render() {
    this.parseDataTitle();
    this.state.data && this.inOrder();
    return (
      <div
        style={{
          position: 'relative',
          width: '400px',
          height: '600px',
          margin: '20px auto',
        }}>
        <Map tiles={this.state.newMatrix} />
        <Player />
      </div>
    );
  }
}

export default World;
