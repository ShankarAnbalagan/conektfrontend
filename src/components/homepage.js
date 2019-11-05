import React, { Component } from "react";
import { Jumbotron, Container, Card } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import Axios from "axios";
import conekt from "./../conekt.png"
class homepage extends Component {
  constructor(props) {
    super(props);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeOption = this.onChangeOption.bind(this);
    this.onSignUpSubmit = this.onSignUpSubmit.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPassChange = this.onPassChange.bind(this);
    this.onSignInSubmit = this.onSignInSubmit.bind(this);
    this.state = {
      username: "",
      email: "",
      password: "",
      branch: "Computer Science and Engineering",

      signInName: "",
      signInPassword: "",

      loggedIn: false,
      userToken: ""
    };
  }

  renderRedirect = () => {
    if (this.state.loggedIn) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { loggedIn: true, userToken: this.state.userToken }
          }}
        />
      );
    }
  };

  onNameChange(e) {
    this.setState({
      signInName: e.target.value
    });
  }

  onPassChange(e) {
    this.setState({
      signInPassword: e.target.value
    });
  }

  async onSignInSubmit(e) {
    e.preventDefault();

    Axios.post("https://conektapi.herokuapp.com/users/login/", {
      userId: this.state.signInName,
      password: this.state.signInPassword
    })
      .then(res => {
        if (res.data.message) {
          this.setState({ loggedIn: true, userToken: res.data.data.userToken });
        }
      })
      .catch(error => {
        alert(error.response.data.message);
        // return(<div>
        // <Alert variant="danger">
        //   <p>{error.response.data.message}</p>
        // </Alert></div>);
      });

    // console.log(`Form submitted`);
    // console.log(`username : ${this.state.username}`);
    // console.log(`email : ${this.state.email}`);
    // console.log(`password : ${this.state.password}`);
    // console.log(`branch : ${this.state.branch}`);
    // this.props.history.push("/");
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangeOption(e) {
    this.setState({
      branch: e.target.value
    });
  }

  async onSignUpSubmit(e) {
    e.preventDefault();

    Axios.post("https://conektapi.herokuapp.com/users/register/", {
      userName: this.state.username,
      email: this.state.email,
      branch: this.state.branch,
      password: this.state.password
    })
      .then(res => {
        if (res.data.message) {
          // return(<div>
          //   <Alert variant="success">
          //     <p>Yay you've successfully registered, please verify your email to continue.</p>
          //   </Alert></div>
          // )
          alert(
            "Yay you've successfully registered, please verify your email to continue."
          );
        }
        this.setState({
          username: "",
          email: "",
          password: "",
          branch: "Computer Science and Engineering"
        });
      })
      .catch(error => {
        alert(error.response.data.message, "danger");
        // return(<div>
        //   <Alert variant="danger">
        //     <p>{error.response.data.message}</p>
        //   </Alert></div>
        // )
      });

    // console.log(`Form submitted`);
    // console.log(`username : ${this.state.username}`);
    // console.log(`email : ${this.state.email}`);
    // console.log(`password : ${this.state.password}`);
    // console.log(`branch : ${this.state.branch}`);
    // this.props.history.push("/");
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <div className="home">
          
              <h1><img src={conekt} alt="img" height="20%"/>CONEKT</h1>
            
        </div>

        <div className="back" style={{ textAlign: "center" }}>
          <div style={{ display: "inline-block", marginTop: "20px" }}>
            <Card
              style={{
                width: "40%",
                marginRight: "20%",
                float: "left"
              }}
            >
              <Card.Title>Register here</Card.Title>
              <Card.Body>
                <form onSubmit={this.onSignUpSubmit} className="FormRules">
                  <div className="form-group FormField">
                    <label className="FormField__Label" htmlFor="name">
                      Username
                    </label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      className="FormField__Input"
                      placeholder="Enter your full name"
                      name="userName"
                      value={this.state.username}
                      onChange={this.onChangeUsername}
                    />
                  </div>
                  <div className="form-group FormField">
                    <label className="FormField__Label" htmlFor="email">
                      Email
                    </label>
                    <br />
                    <input
                      type="email"
                      id="email"
                      className="FormField__Input"
                      placeholder="Enter your email"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                    />
                  </div>
                  <div className="form-group FormField">
                    <label className="FormField__Label" htmlFor="password">
                      Password
                    </label>
                    <br />
                    <input
                      type="password"
                      id="password"
                      className="FormField__Input"
                      placeholder="Enter your password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                    />
                  </div>
                  <div className="form-group FormField">
                    <label className="FormField__Label">
                      select your branch
                      <select
                        className="custom-select"
                        editable="true"
                        name="branch"
                        value={this.state.branch}
                        onChange={this.onChangeOption}
                      >
                        <option value="Computer Science and Enginnering">
                          Computer Science and Enginnering
                        </option>
                        <option value="Information Science and Enginnering">
                          Information Science and Enginnering
                        </option>
                        <option value="Electronics and Communications Enginnering">
                          Electronics and Communications Enginnering
                        </option>
                        <option value="Electrical and Electronics Enginnering">
                          Electrical and Electronics Enginnering
                        </option>
                        <option value="Electronics and Instrumentation Engineering">
                          Electronics and Instrumentation Engineering
                        </option>
                        <option value="Mechanical Enginnering">
                          Mechanical Enginnering
                        </option>
                        <option value="Civil Engineering">
                          Civil Engineering
                        </option>
                      </select>
                    </label>
                  </div>
                  <div className="form-group FormField">
                    <input
                      className="btn btn-dark btn-block"
                      type="submit"
                      value="Sign-Up"
                    />
                  </div>
                </form>
              </Card.Body>
            </Card>
            <Card
              style={{
                width: "40%"
              }}
            >
              <Card.Title>Log-In here</Card.Title>
              <Card.Body>
                <form
                  onSubmit={this.onSignInSubmit}
                  className="FormRules"
                  method="post"
                >
                  <div className="form-group FormField">
                    <label className="FormField__Label" htmlFor="name" style={{margin:"1px"}}>
                      Username
                    </label>
                    <br />
                    <input
                      type="text"
                      id="name"
                      className="FormField__Input"
                      placeholder="Enter your username or email"
                      name="signInName"
                      value={this.state.signInName}
                      onChange={this.onNameChange}
                    />
                  </div>
                  <div className="form-group FormField">
                    <label className="FormField__Label" htmlFor="email">
                      Password
                    </label>
                    <br />
                    <input
                      type="password"
                      id="password"
                      className="FormField__Input"
                      placeholder="Enter your password"
                      name="signInPassword"
                      value={this.state.signInPassword}
                      onChange={this.onPassChange}
                    />
                  </div>
                  <div className="form-group FormField">
                    <input
                      className="btn btn-dark btn-block"
                      type="submit"
                      value="Sign-In"
                    />
                  </div>
                </form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default homepage;
