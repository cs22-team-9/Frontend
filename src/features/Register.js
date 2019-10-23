import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

// export const register = creds => dispatch => {
//     dispatch({ type: REGISTER_START });
//     return (
//         axios
//             .post(`https://disneyparent-backend.herokuapp.com/auth/parents/register`, creds)
//             .then(res => {
//                 dispatch({ type: REGISTER_SUCCESS});
//                 return true;
//             })
//             .catch(err => {
//                 dispatch ({ type: REGISTER_FAILURE, payload: err});
//                 return err.response
//             })
//     )
// }

class Register extends React.Component {
  state = {
    username: '',
    password: '',
    email: '',
  };
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  register = e => {
    e.preventDefault();
    this.props.register(this.state);
    this.setState({
      username: '',
      password: '',
      email: '',
    });
    this.props.history.push('/login');
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

        <button onClick={this.register}>Register</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(Register);
