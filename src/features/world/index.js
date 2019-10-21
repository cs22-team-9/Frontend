import React from 'react';
import Player from '../player';
import Map from '../map';

import { tiles } from '../../data/maps/1';

function World(props) {
  return (
    <div
      style={{
        position: 'relative',
        width: '800px',
        height: '400px',
        margin: '20px auto',
      }}>
      <Map tiles={tiles} />
      <Player />
    </div>
  );
}

export default World;
