import React from 'react';
import { connect } from 'react-redux';
import { SPRITE_SIZE } from '../../config/constants';

import './styles.css';

function getTileSprite(type) {
  switch (type) {
    case 'new_room':
      return 'grass';
    case 5:
      return 'rock';
    case 'Exit':
      return 'tree';
    case 'start_room':
      return 'castle';
  }
}

function MapTile(props) {
  return (
    <div
      className={`tile ${getTileSprite(props.tile)}`}
      style={{ height: SPRITE_SIZE, width: SPRITE_SIZE }}
    />
  );
}

function MapRow(props) {
  return (
    <div className='row' style={{ height: SPRITE_SIZE }}>
      {props.tiles.map(tile => (
        <MapTile tile={tile.title} /> // 10 tiles per row
      ))}
    </div>
  );
}

class Map extends React.Component {
  render() {
    console.log('Map props', this.props.tiles);
    return (
      <div
        style={{
          position: 'relative',
          top: '0px',
          left: '0px',
          width: '800px',
          height: '400px',
          border: '4px solid white',
        }}>
        {this.props.tiles &&
          this.props.tiles.map(row => (
            <MapRow tiles={row} /> // 10 rows
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    // tiles: state.map.tiles,
  };
}

export default connect(mapStateToProps)(Map);
