import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import "../App.css";

class Register extends React.Component {
  state = {
    username: "",
    password1: "",
    password2: "",
    email: ""
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  register = e => {
    e.preventDefault();
    let creds = this.state;
    axios
      .post("https://css22-9.herokuapp.com/api/registration/", creds)
      .then(res => {
        console.log("REGISTER SUCCESS");
        return true;
      })
      .catch(err => {
        console.log(err);
        return err.response;
      });
    this.setState({
      username: "",
      password1: "",
      password2: "",
      email: ""
    });
    this.props.history.push("/login");
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
          value={this.state.password1}
          name="password1"
        />
        <input
          placeholder="Confirm-Password"
          onChange={this.handleChange}
          value={this.state.password2}
          name="password2"
        />
        <input
          placeholder="Email"
          onChange={this.handleChange}
          value={this.state.email}
          name="email"
        />

        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Register);
