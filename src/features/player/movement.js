import store from "../../config/store.js";
import { SPRITE_SIZE, MAP_HEIGHT, MAP_WIDTH } from "../../config/constants.js";
import axiosWithAuth from "../../auth/axiosWithAuth.js";

// let can_move = null;
// function move(direction) {
//   axiosWithAuth()
//     .post("https://css22-9.herokuapp.com/api/adv/move/", direction)
//     // .post("https://lambda-mud-test.herokuapp.com/api/adv/move", direction)
//     .then(res => {
//       console.log(res);

//       // if (res.data.error_msg === "You cannot move that way.") {
//       //   console.log(res.data.error_msg, "INSIDE IF");
//       //   return false;
//       // } else {
//       //   console.log(res.data.error_msg, "INSIDE ELSE");
//       //   return true;
//       // }
//       return res.data.error_msg;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

export default function handleMovement(player) {
  function getNewPosition(oldPos, direction) {
    switch (direction) {
      case "WEST":
        return [oldPos[0] - SPRITE_SIZE, oldPos[1]]; // [-40, 0]
      case "EAST":
        return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
      case "NORTH":
        return [oldPos[0], oldPos[1] - SPRITE_SIZE];
      case "SOUTH":
        return [oldPos[0], oldPos[1] + SPRITE_SIZE];
    }
  }

  // export default function handleMovement(player) {
  // function getNewPosition(oldPos, direction) {
  //   switch (direction) {
  //     case 'WEST':
  //       return [oldPos[0] - SPRITE_SIZE, oldPos[1]]; // [-40, 0]
  //     case 'EAST':
  //       return [oldPos[0] + SPRITE_SIZE, oldPos[1]];
  //     case 'NORTH':
  //       return [oldPos[0], oldPos[1] - SPRITE_SIZE];
  //     case 'SOUTH':
  //       return [oldPos[0], oldPos[1] + SPRITE_SIZE];
  //   }
  // }

  // function getSpriteLocation(direction, walkIndex) {
  //   switch (direction) {
  //     case "s":
  //       return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
  //     case "e":
  //       return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
  //     case "w":
  //       return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
  //     case "n":
  //       return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
  //   }
  // }
  function getSpriteLocation(direction, walkIndex) {
    switch (direction) {
      case "SOUTH":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
      case "EAST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
      case "WEST":
        return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
      case "NORTH":
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

  // function observePath(oldPos, newPos) {
  //   const tiles = store.getState().map.tiles;
  //   const y = newPos[1] / SPRITE_SIZE;
  //   const x = newPos[0] / SPRITE_SIZE;
  //   const nextTile = tiles[y][x];
  //   return nextTile < 5;
  // }

  function dispatchPosition(direction, newPos) {
    const walkIndex = getWalkIndex();
    store.dispatch({
      type: "MOVE_PLAYER",
      payload: {
        position: newPos,
        direction,
        walkIndex,
        spriteLocation: getSpriteLocation(direction, walkIndex) // direction: direction
      }
    });
  }

  function attemptMove(direction) {
    // console.log(move({ direction: dir }));
    // console.log(can_move);
    let dir = null;
    // let can_move = null;
    if (direction === "SOUTH") {
      dir = { direction: "s" };
    } else if (direction === "NORTH") {
      dir = { direction: "n" };
    } else if (direction === "WEST") {
      dir = { direction: "w" };
    } else {
      dir = { direction: "e" };
    }
    axiosWithAuth()
      .post("https://css22-9.herokuapp.com/api/adv/move/", dir)
      .then(res => {
        console.log(res.data.error_msg, "res inside of attempt");
        if (res.data.error_msg == "") {
          const oldPos = store.getState().player.position; // 0,0
          const newPos = getNewPosition(oldPos, direction); // -40, 0

          if (observeBoundaries(oldPos, newPos))
            // && observePath(oldPos, newPos))
            dispatchPosition(direction, newPos);
        } else {
          console.log("ELSE!!!");
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handleKeyDown(e) {
    e.preventDefault();
    switch (e.keyCode) {
      case 37:
        // if (move({ direction: "w" }) === "") {
        return attemptMove("WEST");
      // } else {
      //   console.log("error msg filled");
      // }
      // break;
      // if (move({ direction: "w" })) {
      // return attemptMove("WEST");
      // }
      // return attemptMove("w");
      case 38:
        // if (move({ direction: "n" }) === "") {
        return attemptMove("NORTH");
      // } else {
      //   console.log("error msg filled");
      // }
      // break;

      // return attemptMove("n");

      case 39:
        // if (move({ direction: "e" })) {
        return attemptMove("EAST");
      // } else {
      //   console.log("error msg filled");
      // }
      // break;

      // return attemptMove("e");

      case 40:
        // if (move({ direction: "s" }) === "") {
        //   attemptMove("SOUTH");
        // } else {
        //   console.log("error msg filled");
        // }
        // break;

        // if (move({ direction: "s" })) {
        return attemptMove("SOUTH");
      // }
      // return attemptMove("s");

      default:
        console.log(e.keyCode);
    }
  }

  window.addEventListener("keydown", e => {
    if (e.srcElement.nodeName !== "INPUT") {
      handleKeyDown(e);
    }
  });

  return player;
}
