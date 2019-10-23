import store from '../../config/store.js';
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from '../../config/constants.js';

export default function handleMovement(player) {
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case 'WEST':
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]]; // [-40, 0]
      case 'EAST':
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case 'NORTH':
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case 'SOUTH':
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case 'SOUTH':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
      case 'EAST':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case 'WEST':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case 'NORTH':
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
    }
  }

  function getWalkIndex() {
    const walkIndex = store.getState().player.walkIndex;
    return walkIndex >= 7 ? 0 : walkIndex + 1;
  }

  function observeBoundaries(oldPos, newPos) {
    return (
      newPos[0] >= 0 &&
      newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
      (newPos[1] >= 0 && newPos[1] <= MAP_HEIGHT - SPRITE_SIZE)
    );
  }

  function observePath(oldPos, newPos) {
    const tiles = store.getState().map.tiles;
    const y = newPos[1] / SPRITE_SIZE;
    const x = newPos[0] / SPRITE_SIZE;
    const nextTile = tiles[y][x];
    return nextTile < 5;
  }

  function dispatchPosition(direction, newPos) {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: 'MOVE_PLAYER',
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex), // direction: direction
      },
    });
  }

  function attemptMove(direction) {
    const oldPos = store.getState().player.position; // 0,0
    const newPos = getNewPosition(oldPos, direction); // -40, 0

    if (observeBoundaries(oldPos, newPos) && observePath(oldPos, newPos))
      dispatchPosition(direction, newPos);
  }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        return attemptMove('WEST');
      case 38:
        return attemptMove('NORTH');
      case 39:
        return attemptMove('EAST');
      case 40:
        return attemptMove('SOUTH');
      default:
        console.log(e.keyCode);
    }
  }

  window.addEventListener('keydown', e => {
    handleKeyDown(e);
  });

  return player;
}

// export class Game extends Component {
//   state = {
//     rooms: [],
//     current_room: 0,
//   };

//   componentDidMount() {
//     // axios call to get all rooms, once endpoint is implemented on backend
//   }

//   goNorth = nextRoomId => {
//     this.setState({ current_room: nextRoomId });
//     axios
//       .post(
//         'https://lambda-mud-test.herokuapp.com/api/adv/move/',
//         { direction: 'n' },
//         { Authorization: 'Token 6b7b9d0f33bd76e75b0a52433f268d3037e42e66' },
//       )
//       .then(res => console.log(res)) //set state to next room here, just dont't know how data looks rn
//       .catch(error => console.log(error));
//   };

//   goWest = nextRoomId => {
//     this.setState({ current_room: nextRoomId });
//     axios
//       .post(
//         'https://lambda-mud-test.herokuapp.com/api/adv/move/',
//         { direction: 'w' },
//         { Authorization: 'Token 6b7b9d0f33bd76e75b0a52433f268d3037e42e66' },
//       )
//       .then(res => console.log(res))
//       .catch(error => console.log(error));
//   };

//   goEast = nextRoomId => {
//     this.setState({ current_room: nextRoomId });
//     axios
//       .post(
//         'https://lambda-mud-test.herokuapp.com/api/adv/move/',
//         { direction: 'e' },
//         { Authorization: 'Token 6b7b9d0f33bd76e75b0a52433f268d3037e42e66' },
//       )
//       .then(res => console.log(res))
//       .catch(error => console.log(error));
//   };

//   goSouth = nextRoomId => {
//     this.setState({ current_room: nextRoomId });
//     axios
//       .post(
//         'https://lambda-mud-test.herokuapp.com/api/adv/move/',
//         { direction: 's' },
//         { Authorization: 'Token 6b7b9d0f33bd76e75b0a52433f268d3037e42e66' },
//       )
//       .then(res => console.log(res))
//       .catch(error => console.log(error));
//   };

//   render() {
//     return (
//       <div className='gamebox'>
//         {
//           (this.state.rooms.forEach = room => {
//             return (
//               <Room
//                 room={room}
//                 current_room={this.state.current_room}
//                 goNorth={this.goNorth}
//                 goWest={this.goWest}
//                 goEast={this.goEast}
//                 goSouth={this.goSouth}
//               />
//             );
//           })
//         }
//       </div>
//     );
//   }
// }

// export default Game;
