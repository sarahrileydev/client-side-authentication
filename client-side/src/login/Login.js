import React from "react";
import axios from "axios";

class Login extends React.Component {
  state = {
    
    username: "",
    password: ""
  };

  render() {
    return (
      <>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="username" />
            <input
              name="username"
              id="username"
              value={this.state.username}
              onChange={this.handleInputChange}
              type="text"
              placeholder="username"
            />
          </div>
          <div>
            <label htmlFor="password" />
            <input
              name="password"
              id="password"
              value={this.state.password}
              onChange={this.handleInputChange}
              type="password"
              placeholder="password"
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </>
    );
  }

  //CLASS METHODS
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
    //the endpoint could come from an environment variable
    //const endpoint = `${process.env.api_url}`/api/auth/login;
    const endpoint = "http://localhost:5000/api/auth/login";
    axios
      .post(endpoint, this.state)
      .then(res => {
        //this is the new part - localStorage
        localStorage.setItem("jwt", res.data.token); //server is going to store token
        this.props.history.push('/users');
      })
      .catch(err => {
        console.error(err);
      });
  };
}

export default Login;