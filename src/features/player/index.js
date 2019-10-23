import React from 'react';
import { connect } from 'react-redux'; // connect store to component
import walkSprite from './player_walk.png';
import handleMovement from './movement.js';

function Player(props) {
  return (
    <div
      style={{
        position: 'absolute',
        top: props.position[1],
        left: props.position[0],
        backgroundImage: `url(${walkSprite})`,
        backgroundPosition: props.spriteLocation, // 0, 0
        width: '40px',
        height: '40px',
      }}></div>
  );
}

function mapStateToProps(state) {
  return {
    ...state.player,
    // position: state.player.position,
  };
}

export default connect(mapStateToProps)(handleMovement(Player));
