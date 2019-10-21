import store from '../../config/store.js';
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../config/constants.js';

export default function handleMovement(player) {
  function getNewPosition(direction) {
    const oldPos = store.getState().player.position;
    switch (direction) {
      case 'WEST':
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]];
      case 'EAST':
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case 'NORTH':
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case 'SOUTH':
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  function observeBoundaries(oldPos, newPos) {
    return newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
      ? newPos
      : oldPos;
  }

  function dispatchPosition(direction) {
    const oldPos = store.getState().player.position;
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: observeBoundaries(oldPos, getNewPosition(direction)),
      },
    });
  }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        return dispatchPosition('WEST');
      case 38:
        return dispatchPosition('NORTH');
      case 39:
        return dispatchPosition('EAST');
      case 40:
        return dispatchPosition('SOUTH');
      default:
        console.log(e.keyCode);
    }
  }

  window.addEventListener('keydown', e => {
    handleKeyDown(e);
  });

  return player;
}
