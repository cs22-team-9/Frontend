import React from "react";
import Player from "../player";
import Map from "../map";
import axios from "axios";
import axiosWithAuth from "../../auth/axiosWithAuth.js";

var _ = require("lodash");

class World extends React.Component {
  state = {
    id: "",
    name: "",
    title: "",
    description: "",
    players: [],
    current_room: null,
    data: null,
    data_title: [],
    matrix: null,
    newOrder: [],
    newMatrix: null
  };

  componentDidMount() {
    axiosWithAuth()
      .get("https://css22-9.herokuapp.com/api/adv/init/")
      // .get("https://lambda-mud-test.herokuapp.com/api/adv/init")
      .then(res => {
        console.log("INIT RES", res);
        this.setState({
          id: res.data.uuid,
          name: res.data.name,
          title: res.data.title,
          description: res.data.description,
          players: res.data.players,
          current_room: res.data.current_room
        });
      })
      .catch(err => {
        console.log(`Init ERR ${err}`);
      });
    return this.getData();
  }

  getData = () => {
    axiosWithAuth()
      .get("https://css22-9.herokuapp.com/api/adv/rooms/")
      // .get("https://lambda-mud-test.herokuapp.com/api/adv/rooms")
      .then(res => {
        this.setState({ data: res.data });
      });
  };
  goDirection = direction => {
    axiosWithAuth()
      .post("https://css22-9.herokuapp.com/api/adv/move/", direction)
      // .post("https://lambda-mud-test.herokuapp.com/api/adv/move", direction)
      .then(res => {
        console.log(res);
        this.setState({
          id: res.data.uuid,
          name: res.data.name,
          title: res.data.title,
          description: res.data.description,
          players: res.data.players
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  parseDataTitle = () => {
    this.state.data &&
      this.state.data.map(element => {
        this.state.data_title.push(element.title);
      });
    this.state.data_title &&
      (this.state.matrix = _.chunk(this.state.data_title, 25));

    this.state.data && (this.state.newMatrix = _.chunk(this.state.data, 25));
  };

  inOrder = () => {
    let oldOrder = this.state.data;

    for (let i = 0; i < 250; i++) {
      let y = oldOrder[i].x;
      let x = oldOrder[i].y;

      this.state.newMatrix[y][x] = oldOrder[i];
    }
  };

  logOut = () => {
    localStorage.removeItem("token");
    console.log("LOGGEDOUT");
    // window.location.reload(false);
    // props.history.push("/login");
  };

  render() {
    this.parseDataTitle();
    this.state.data && this.inOrder();
    console.log(this.state.newMatrix);
    return (
      <div
        style={{
          position: "relative",
          width: "1000px",
          height: "400px",
          margin: "20px auto"
        }}
      >
        <Map
          tiles={this.state.newMatrix}
          current_room={this.state.current_room}
        />
        <Player />

        <div onClick={this.logOut}>LOGOUT</div>
        <div>No map? Refresh the browser!</div>
      </div>
    );
  }
}

export default World;
