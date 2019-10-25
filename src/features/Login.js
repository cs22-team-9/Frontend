import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../App.css";

class Login extends React.Component {
  state = {
    username: "",
    password: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  loggingIn = e => {
    e.preventDefault();
    let creds = this.state;
    let username = this.state.username;
    // this.props.loggingIn(this.state, this.state.username);
    axios
      .post(`https://css22-9.herokuapp.com/api/login/`, creds)
      // .post(`https://lambda-mud-test.herokuapp.com/api/login/`, creds)
      .then(res => {
        console.log("LOGIN SUCCESS", res);
        localStorage.setItem("token", res.data.key);
        // localStorage.setItem("username", username);
        return true;
      })
      .catch(err => {
        console.log("err", err);
        return err.response;
      });
    this.setState({
      username: "",
      password: "",
      email: ""
    });
    this.props.history.push("/");
  };
  render() {
    return (
      <div className="input-form">
        <input
          placeholder="Username"
          onChange={this.handleChange}
          value={this.state.username}
          name="username"
        />
        <input
          placeholder="Password"
          onChange={this.handleChange}
          value={this.state.password}
          name="password"
        />
        <input
          placeholder="Email"
          onChange={this.handleChange}
          value={this.state.email}
          name="email"
        />
        <button onClick={this.loggingIn}>Login</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Login);
