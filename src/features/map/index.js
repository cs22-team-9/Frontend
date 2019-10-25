import React from "react";
import { connect } from "react-redux";
import { SPRITE_SIZE } from "../../config/constants";

import "./styles.css";

function getTileSprite(type) {
  switch (type) {
    case "new_room":
      return "grass";
    case 5:
      return "rock";
    case "Exit":
      return "tree";
    case "start_room":
      return "castle";
    default:
      console.log("");
  }
}

function MapTile(props) {
  let borderRight = props.tile.e_to === 0 ? "2px solid black" : "None";
  let borderLeft = props.tile.w_to === 0 ? "2px solid black" : "None";
  let borderTop = props.tile.n_to === 0 ? "2px solid black" : "None";
  let borderBottom = props.tile.s_to === 0 ? "2px solid black" : "None";
  // let backgroundColor = props.current_room === props.tile.id ? "blue" : "green";
  // console.log(props.current_room, "cur room props");
  return (
    <div
      className={`tile ${getTileSprite(props.title)}`}
      style={{
        boxSizing: "border-box",
        height: SPRITE_SIZE,
        width: SPRITE_SIZE,
        borderRight: borderRight,
        borderLeft: borderLeft,
        borderTop: borderTop,
        borderBottom: borderBottom
        // backgroundColor: backgroundColor
      }}
    />
  );
}

function MapRow(props) {
  // console.log(props.current_room, "mapROW");
  return (
    <div className="row" style={{ height: SPRITE_SIZE }}>
      {props.tiles.map(tile => (
        <MapTile
          title={tile.title}
          tile={tile}
          current_room={props.current_room}
        /> // 10 tiles per row
      ))}
    </div>
  );
}

class Map extends React.Component {
  render() {
    // console.log("Map props", this.props.tiles);
    console.log(this.props.current_room, "MAP PROPS");
    return (
      <div
        style={{
          position: "relative",
          top: "0px",
          left: "0px",
          width: "1000px",
          height: "400px",
          border: "4px solid white"
        }}
      >
        {this.props.tiles &&
          this.props.tiles.map(row => (
            <MapRow tiles={row} current_room={this.props.current_room} /> // 10 rows
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

// import React, { useState, useEffect } from "react";
// // import "./Room.scss";

// export default function Room(props) {
//   let borderRight =
//     props.room.e_to > 0 ? "5px solid dodgerblue" : "5px solid red";
//   let borderLeft =
//     props.room.w_to > 0 ? "5px solid dodgerblue" : "5px solid red";
//   let borderTop =
//     props.room.n_to > 0 ? "5px solid dodgerblue" : "5px solid red";
//   let borderBottom =
//     props.room.s_to > 0 ? "5px solid dodgerblue" : "5px solid red";

//   let background = props.playerRoomId === props.room.id ? "black" : "lightgrey";

//   return (
//     <div
//       className="game-board"
//       style={{
//         borderRight: borderRight,
//         borderLeft: borderLeft,
//         borderTop: borderTop,
//         borderBottom: borderBottom,
//         background: background
//       }}
//     ></div>
//   );
// }
