import React, { Component } from "react";
import { Navbar, Nav } from "react-bootstrap";
import conekt from "./../conekt.png";
import Axios from 'axios';
import {Redirect} from 'react-router-dom';
class commute extends Component {
  constructor(props) {
    super(props);
    this.onclick = this.onclick.bind(this);
    this.onclickdashboard = this.onclickdashboard.bind(this);
    this.state = { redirect: false, dashboard: false, data:null};
  }

  componentWillMount() {
    this.setState({ data: this.props.location.state.data });
  }

  async onclick() {
    Axios.get(
      "https://conektapi.herokuapp.com/users/logout/" +
        this.props.location.state.userToken
    )
      .then(res => {
        if (res.data.message) {
          alert("LOGGED out successfully");
          this.setState({ redirect: true });
        }
      })
      .catch(error => {
        alert(error.response.data.message);
      });
  }

  onclickdashboard() {
    this.setState({ dashboard: true });
  }

  renderRedirect() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.dashboard) {
      return (
        <Redirect
          to={{
            pathname: "/dashboard",
            state: { userToken: this.props.location.state.userToken }
          }}
        />
      );
    }
  }
  render() {
    const obj = this.state.data.map( ( {opId,opName, text} ) => {
        return <p key={opId}>{opName} - {text}</p>
    })
    return (
      <div>
        {this.renderRedirect()}

        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">
            <img src={conekt} alt="conekt" height="60px" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={this.onclickdashboard}>Dashboard</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link onClick={this.onclick}>Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div>{obj}</div>
      </div>
    );
  }
}

export default commute;
