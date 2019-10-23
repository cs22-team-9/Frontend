import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    accountType: '',
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loggingIn = e => {
    e.preventDefault();
    let creds = this.state;
    let username = this.state.username;
    // this.props.loggingIn(this.state, this.state.username);
    axios
      .post(
        `https://disneyparent-backend.herokuapp.com/auth/parents/login`,
        creds,
      )
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('username', username);
        return true;
      })
      .catch(err => {
        return err.response;
      });
    this.setState({
      username: '',
      password: '',
      accountType: '',
    });
    this.props.history.push('/');
  };
  render() {
    return (
      <div className='input-form'>
        <input
          placeholder='Username'
          onChange={this.handleChange}
          value={this.state.username}
          name='username'
        />
        <input
          placeholder='Password'
          onChange={this.handleChange}
          value={this.state.password}
          name='password'
        />
        <input
          placeholder='Email'
          onChange={this.handleChange}
          value={this.state.email}
          name='email'
        />
        <input
          placeholder='Account type'
          onChange={this.handleChange}
          value={this.state.accountType}
          name='accountType'
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
